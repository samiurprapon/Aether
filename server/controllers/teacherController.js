const Teacher = require("../models/teachers");

const upsert = (req, res) => {
  let user = res.locals.user;

  // console.log(user);

    Teacher.findOne({
      where: {
        uid: user.uid,
      },
    })
      .then((teacher) => {
        if (teacher !== null) {
          // console.log("teacher found");)
          teacher
            .update({
              initial: req.body.initial,
              name: req.body.name,
              sex: req.body.sex,
            })
            .then((updatedTeacher) => {
              res.status(201);
              res.send({
                success: true,
                message: "Teacher Profile updated!",
                teacher: updatedTeacher,
              });
            })
            .catch((err) => {
              res.status(403);
              res.send({
                success: false,
                message: err.message,
              });
            });
        } else {
          Teacher.create({
            initial: req.body.initial,
            name: req.body.name,
            sex: req.body.sex,
            uid: user.uid,
          })
            .then((newTeacher) => {
              res.status(201);
              res.send({
                success: true,
                message: "Teacher account created successfully!",
                teacher: newTeacher,
              });
            })
            .catch((err) => {
              res.status(400);
              res.send({
                success: false,
                message: err.message,
              });
            });
        }
      })
      .catch((err) => {
        res.status(403);
        res.send({
          success: false,
          message: err.message,
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
          success: true,
          isCompleted: true,
          message: "Profile verification is completed!",
        });
      } else {
        res.status(204);
        res.send({
          success: true,
          isCompleted: false,
          message: "Profile verification is completed!",
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

  Teacher.findOne({
    where: {
      uid: user.uid,
    },
  })
    .then((teacher) => {
      res.status(200);
      res.send({
        success: true,
        message: "request successful!",
        teacher: teacher,
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
