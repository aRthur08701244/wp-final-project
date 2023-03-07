// import uuidv4 from 'uuid/v4';
import {v4 as uuidv4} from 'uuid'
import mongoose from 'mongoose';

// const makeName = (name, to) => { return String([name, to].join('_')); };


const checkOut = async(name, Model) => {
  // let name = makeName(name1, name2)
  let box = await Model.findOne({ name });
  if (!box)
    box = await new Model({ name }).save();
  return box;
}

const Mutation = {

  createCampus: async (parent, { campusName }, { CampusModel }) => {
    return checkOut(campusName, CampusModel).courses
  },

  createCourse: async (parent, { campusName, courseName, profName, author }, { pubsub, CampusModel, CourseModel }) => {
    const campus = await checkOut(campusName, CampusModel)
    const integratedName = [profName, courseName].join('_')
    let newCourse = await campus.courses.findIndex(x => (x.name == integratedName) && (x.prof == profName))
    if (newCourse == -1) { // campus.courses.push(courseName)
      newCourse = {name: integratedName, prof: profName, author}
      campus.courses.push(newCourse)
      await campus.save()
      pubsub.publish(`campus ${campusName}`, {
        course: newCourse
      });
    }

    let box = await CourseModel.findOne({ name: integratedName, prof: profName });
    if (!box) box = await new CourseModel({ name: integratedName, prof: profName }).save();
    return box
  },

  createSemester: async (parent, { courseName, profName, semesterName }, { pubsub, CourseModel }) => {
    const course = await checkOut(courseName, CourseModel);
    let newSemester = await course.semesters.findIndex(x => x.name == [courseName, semesterName].join('_') );
    if (newSemester == -1) {
      // newSemester = { _id: new mongoose.Types.ObjectId, name:  [integratedName, semesterName].join('_'), chatboxes: [] }
      newSemester = {name: [courseName, semesterName].join('_'), chatboxes: []}
      course.semesters.push(newSemester)
      await course.save()
      pubsub.publish(`course ${courseName}`, {
        semester: newSemester,
      });
      return newSemester
    }
    else {
      newSemester = course.semesters[newSemester]
      return newSemester
    }
  },

  createChatBox: async (parent, { courseName, profName, semesterName, chatboxName }, { pubsub, CourseModel }) => {
    const integratedName = [courseName, semesterName].join('_')
    const course = await checkOut(courseName, CourseModel);
    let semester = await course.semesters.findIndex(x => x.name == integratedName );
    if (semester == -1) {
      semester = {name: integratedName, chatboxes: [{name: [integratedName, chatboxName].join('_'), messages: []}]}
      course.semesters.push(semester)
      await course.save()
      pubsub.publish(`course ${courseName}`, {
        semester: semester,
      });
    }
    else {
      semester = course.semesters[semester]
    }
    let newChatBox = await semester.chatboxes.findIndex(x =>  x.name == [integratedName, chatboxName].join('_') );
    if (newChatBox == -1) {
      // newChatBox = { name:  [integratedName, chatboxName].join('_')}
      newChatBox = { name: [integratedName, chatboxName].join('_') }
      semester.chatboxes.push(newChatBox)
      await course.save()
      // pubsub.publish(`semester ${integratedName}`, {
      //   chatbox: newChatBox,
      // });
      pubsub.publish(`course ${courseName}`, {
        semester: semester,
      });
      return newChatBox
    }
    else {
      newChatBox = semester.chatboxes[newChatBox]
      return newChatBox
    }
  },

  createMessage: async (parent, { courseName, profName, semesterName, chatboxName, sender, body }, { pubsub, CourseModel } ) => {
    const integratedName = [courseName, semesterName, chatboxName].join('_')
    const course = await checkOut(courseName, CourseModel);
    let semester = await course.semesters.findIndex(x => x.name == [courseName, semesterName].join('_') );
    // console.log(semester)
    semester = course.semesters[semester]
    // console.log(semester)
    let chatBox = await semester.chatboxes.findIndex(x => x.name == integratedName );
    if (chatBox == -1) {
      chatBox = { name: integratedName }
      semester.chatboxes.push(chatBox)
      await course.save()
      pubsub.publish(`course ${courseName}`, {
        semester: semester,
      });
    }
    else {
      chatBox = semester.chatboxes[chatBox]
    }

    const newMsg =  { sender, body };
    chatBox.messages.push(newMsg);
    await course.save();
    // pubsub.publish(`chatBox ${integratedName}`, {
    //   message: newMsg,
    // });
    // pubsub.publish(`semester ${[courseName, semesterName].join('_')}`, {
    //   chatbox: chatBox,
    // });
    pubsub.publish(`course ${courseName}`, {
      semester: semester,
    });
    return newMsg;
  },
 
};

export default Mutation;