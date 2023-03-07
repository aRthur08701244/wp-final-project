import mongoose from 'mongoose';
const Schema = mongoose.Schema

const CampusSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required.']
  },
  courses: [{
    name: {
      type: String,
      required: [true, 'Name field is required.']
    },
    prof: {
      type: String,
      required: [true, 'Name field is required.']
    },
    author: {
      type: String,
      required: [true, 'Name field is required.']
    }
  }]
})

const CampusModel = mongoose.model('Campus', CampusSchema);

const CourseSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Name field is required.']
    },
    prof: {
      type: String,
      required: [true, 'Name field is required.']
    },
    semesters: [{
      name: {
        type: String,
        required: [true, 'Name field is required.']
      },
      chatboxes: [{
        name: {
          type: String,
          required: [true, 'Name field is required.']
        },
        messages: [{
          sender: { type: String },
          body  : { type: String }
        }]
      }]
    }]
});

const CourseModel = mongoose.model('Course', CourseSchema);

export { CampusModel, CourseModel}

/******* Course Schema *******/
// const CourseSchema = new Schema({
//   name: { type: String, required: [true, 'Name field is required.'] },
//   semesters: [{ type: mongoose.Types.ObjectId, ref: 'Semester' }], // ref: foreign key
// })
// const CourseModel = mongoose.model('Course', CourseSchema);

// /******* Semester Schema *******/
// const SemesterSchema = new Schema({
//   name: { type: String, required: [true, 'Name field is required.'] },
//   chatboxes: [{ type: mongoose.Types.ObjectId, ref: 'ChatBox' }],
// });
// const SemesterModel = mongoose.model('Semester', SemesterSchema);

// /******* ChatBox Schema *******/
// const ChatBoxSchema = new Schema({
//   name: { type: String, required: [true, 'Name field is required.'] },
//   // messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
//   messages: [{
//     sender: { type: String },
//     body  : { type: String }
//   }]
// });
// const ChatBoxModel = mongoose.model('ChatBox', ChatBoxSchema);

/******* Message Schema *******/
// const MessageSchema = new Schema({
//   // chatBox: { type: mongoose.Types.ObjectId, ref: 'ChatBox' }, /* 可省略 */
//   sender: { type: String, required: [true, 'Sender field is required.']  },
//   body: { type: String, required: [true, 'Body field is required.'] },
// });
// const MessageModel = mongoose.model('Message', MessageSchema);

// export {CourseModel, SemesterModel, ChatBoxModel}