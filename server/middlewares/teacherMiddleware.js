const Teacher = require("../models/teachers");

const teacherValidation = (req, res, next) => {
  let user = res.locals.user;

  Teacher.findOne({
    where: {
      uid: user.uid,
    },
  })
    .then((teacher) => {
      if (!teacher) {
        res.status(400);
        res.send({
          success: false,
          message: "you are not authorized to make changes!",
        });
      } else {
        res.locals.teacher = teacher;
        next();
      }
    })
    .catch((err) => {
      res.status(500);
      res.send({
        success: false,
        message: err.message,
      });
    });
};

module.exports = {
  teacherValidation,
};
