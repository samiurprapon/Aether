const Sequelize = require("../models/index").Sequelize;

const Student = require("../models/students");
const Course = require("../models/courses");

const StudentCourse = Sequelize.model("studentCourses");

const enroll = (req, res) => {
  let student = res.locals.student;

  Course.findOne({
    where: {
      enroll: req.body.enroll,
    },
  })
    .then((course) => {
      StudentCourse.upsert({
        courseId: course.id,
        studentId: student.id,
      })
        .then((studentCourse) => {
          res.status(201);
          res.send({
            success: true,
            message: "Successfully enrolled in " + course.name + "!",
          });
        })
        .catch((er) => {
          res.status(404);
          res.send({
            success: false,
            message: er.message,
          });
        });
    })
    .catch((err) => {
      res.status(404);
      res.send({
        success: false,
        message: err.message,
      });
    });
};

const drop = (req, res) => {
  let student = res.locals.student;

  StudentCourse.findOne({
    where: {
      courseId: req.body.courseId,
      studentId: student.id,
    },
  })
    .then((studentCourse) => {
      return studentCourse.destroy();
    })
    .then((result) => {
      res.status(200);
      res.send({
        success: true,
        message: "Course dropped successfully!",
      });
    })
    .catch((err) => {
      res.status(404);
      res.send({
        success: false,
        message: err.message,
      });
    });
};

const list = (req, res) => {
  let student = res.locals.student;

  Student.findOne({
    where: {
      id: student.id,
    },
    include: {
      model: Course,
    },
  })
    .then((data) => {
      res.status(200);
      res.send({
        success: true,
        message: "Successfully listed courses!",
        courses: data.courses.map((course) => {
          return {
            id: course.id,
            code: course.code,
            section: course.section,
            name: course.name,
            enroll: course.enroll,
            semester: course.semester,
            archived: course.archived,
            tid: course.tid
          };
        }),
      });
    })
    .catch((err) => {
      res.status(400);
      res.send({
        success: false,
        message: err.message,
      });
    });
};

module.exports = {
  enroll,
  drop,
  list,
};
