const Student = require("../models/students");

const studentValidation = (req, res, next) => {
  let user = res.locals.user;

  Student.findOne({
    where: {
      uid: user.uid,
    },
  })
    .then((student) => {
      if (!student) {
        res.status(400);
        res.send({
          success: false,
          message: "you are not authorized to make changes!",
        });
      } else {
        res.locals.student = student;
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
  studentValidation,
};
