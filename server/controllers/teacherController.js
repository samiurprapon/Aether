const Teacher = require("../models/teachers");

const upsert = (req, res) => {
  let user = res.locals.user;

  // console.log(user);

  Teacher.upsert({
    initial: req.body.initial,
    name: req.body.name,
    sex: req.body.sex,
    uid: user.uid,
  })
    .then((teacher) => {
      res.status(201);
      res.send({
        message: "Teacher Profile updated!",
        teacher: teacher,
      });
    })
    .catch((err) => {
      res.status(403);
      res.send({
        message: "Profile update failed!",
      });
    });
};

const isCompleted = (req, res) => {
  let user = res.locals.user;

  Teacher.findOne({
    where: {
      uid: user.uid,
    },
  })
    .then((teacher) => {
      if (teacher != null) {
        res.status(202);
        res.send({
          isCompleted: true,
          message: "Profile verification is completed!",
        });
      } else {
        res.status(204);
        res.send({
          isCompleted: false,
          message: "Profile verification is completed!",
        });
      }
    })
    .catch((err) => {
      res.status(204);
      res.send({
        isCompleted: false,
        message: err.message,
      });
    });
};

const details = (req, res) => {
  let user = res.locals.user;

  Teacher.findOne({
    where: {
      uid: user.uid,
    },
  })
    .then((teacher) => {
      res.status(200);
      res.send({
        message: "request successful!",
        teacher: teacher,
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
  upsert,
  isCompleted,
  details,
};
