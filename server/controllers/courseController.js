const Course = require("../models/courses");

const addCourse = (req, rs) => {
  let user = res.locals.user;

  Course.create({
    code: req.body.code,
    section: req.body.section,
    name: req.body.name,
    semester: req.body.semester,
    uid: user.uid,
  })
    .then((course) => {
      res.status(201);
      res.send({
        message: "Course section created successfully!",
        course: course,
      });
    })
    .catch((err) => {
      res.status(400);
      res.send({
        message: "creating course failed!",
      });
    });
};

module.exports = {
    addCourse
};
