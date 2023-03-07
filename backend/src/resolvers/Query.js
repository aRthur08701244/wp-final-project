// const makeName = (name, to) => { return String([name, to].join('_')); };

const Query = {
  course: async (parent, {campusName, courseName, profName}, { CampusModel, CourseModel }) => {
    // await CourseModel.deleteMany({});

    const campus = await CampusModel.findOne({ name: campusName })
    if (campus.courses.findIndex(x => ((x.name == courseName) && (x.prof == profName))) == -1) {
      console.log('no!!!!!!!!!!!!!!!!!!! in query resolver')
      return []
    }

    let box = await CourseModel.findOne({ name: courseName, prof: profName });
    if (!box)
      box = await new CourseModel({ name: courseName, prof: profName }).save();
    return box;
  },
  campus: async (parent, {campusName}, { CampusModel }) => {
    // await CampusModel.deleteMany({});
    let campus = await CampusModel.findOne({ name: campusName });
    if (!campus)
      campus = await new CampusModel({ name: campusName }).save();
    return campus.courses;
  }
};
export default Query;