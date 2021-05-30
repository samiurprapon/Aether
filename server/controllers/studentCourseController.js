const Sequelize = require("../models/index").Sequelize;

const Student = require("../models/students");
const Course = require("../models/courses");

const StudentCourse = Sequelize.model("studentCourses");

const enroll = (req, res) => {
  let user = res.locals.user;

  Student.findOne({
    where: {
      uid: user.uid,
    },
  })
    .then((student) => {
      Course.findOne({
        where: {
          enroll: req.body.enroll,
        },
      }).then((course) => {
        StudentCourse.upsert({
          courseId: course.id,
          studentId: student.id,
        })
          .then((studentCourse) => {
            res.status(201);
            res.send({
              message: "Successfully enrolled in $(course.name)!",
            });
          })
          .catch((errr) => {
            res.status(404);
            res.send({
              message: "enroll code not found!",
            });
          });
      });
    })
    .catch((err) => {
      res.status(403);
      res.send({
        message: "No student found!",
      });
    });

  // console.log(user);
};

const drop = (req, res) => {
  let user = res.locals.user;

  StudentCourse.findOne({
    where: {
      courseId: req.body.courseId,
      studentId: user.id,
    },
  })
    .then((studentCourse) => {
      return studentCourse.destroy();
    })
    .then((result) => {
      res.status(200);
      res.send({
        message: "Course dropped successfully!",
      });
    })
    .catch((err) => {
      res.status(404);
      res.send({
        message: err.message,
      });
    });
};

const list = (req, res) => {
  let user = res.locals.user;

  StudentCourse.getCourses({
    where: {
      studentId: user.id,
    },
  })
    .then((courses) => {
      res.status(200);
      res.send({
        courses: courses,
      });
    })
    .catch((err) => {
      res.status(403);
      res.send({
        message: "unsuccessful request!",
      });
    });
};

module.exports = {
  enroll,
  drop,
  list,
};
