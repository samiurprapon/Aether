const Student = require("../models/students");

const upsert = (req, res) => {
  let user = res.locals.user;

  // console.log(user);

  Student.upsert({
    studentID: req.body.studentID,
    name: req.body.name,
    sex: req.body.sex,
    uid: user.uid,
  })
    .then((student) => {
      res.status(201);
      res.send({
        success: true,
        message: "Student Profile updated!",
        student: student[0],
      });
    })
    .catch((err) => {
      res.status(403);
      res.send({
        success: false,
        message: "Profile update failed!",
      });
    });
};

const isCompleted = (req, res) => {
  let user = res.locals.user;

  Student.findOne({
    where: {
      uid: user.uid,
    },
  })
    .then((student) => {
      if (student != null) {
        res.status(202);
        res.send({
          success: true,
          isCompleted: true,
          message: "Profile verification is completed!",
        });
      } else {
        res.status(204);
        res.send({
          success: true,
          isCompleted: false,
          message: "Profile verification is not completed!",
        });
      }
    })
    .catch((err) => {
      res.status(204);
      res.send({
        success: false,
        isCompleted: false,
        message: err.message,
      });
    });
};

const details = (req, res) => {
  let user = res.locals.user;

  Student.findOne({
    where: {
      uid: user.uid,
    },
  })
    .then((student) => {
      res.status(200);
      res.send({
        success: true,
        message: "request successful!",
        student: student,
      });
    })
    .catch((err) => {
      res.status(403);
      res.send({
        success: false,
        message: "unsuccessful request!",
      });
    });
};

module.exports = {
  upsert,
  isCompleted,
  details,
};
