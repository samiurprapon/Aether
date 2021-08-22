const Student = require("../models/students");

const upsert = (req, res) => {
  let user = res.locals.user;

  // console.log(user);

  Student.findOne({
    where: {
      uid: user.uid,
    },
  })
    .then((student) => {
      if (student !== null) {
        // console.log("student found");)
        student
          .update({
            studentID: req.body.studentID,
            name: req.body.name,
            sex: req.body.sex,
          })
          .then((updatedStudent) => {
            res.status(201);
            res.send({
              success: true,
              message: "Student Profile updated!",
              student: updatedStudent,
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
        Student.create({
          studentID: req.body.studentID,
          name: req.body.name,
          sex: req.body.sex,
          uid: user.uid,
        })
          .then((newStudent) => {
            res.status(201);
            res.send({
              success: true,
              message: "Student account created successfully!",
              student: newStudent,
            });
          })
          .catch((err) => {
            res.status(400);
            res.send({
              message: "creating course failed!",
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

  // upsert causes error
  // Student.upsert(
  //   {
  //     studentID: req.body.studentID,
  //     name: req.body.name,
  //     sex: req.body.sex,
  //     uid: user.uid,
  //   },
  //   // {
  //   //   where: {
  //   //     uid: user.uid,
  //   //   },
  //   //   returning: true,
  //   // }
  // )
  //   .then((student) => {
  //     res.status(201);
  //     res.send({
  //       success: true,
  //       message: "Student Profile updated!",
  //       student: student,
  //     });
  //   })
  //   .catch((err) => {
  //     res.status(403);
  //     res.send({
  //       success: false,
  //       message: err.message,
  //     });
  //   });
};

const isCompleted = (req, res) => {
  let user = res.locals.user;

  Student.findOne({
    where: {
      uid: user.uid,
    },
  })
    .then((student) => {
      if (student !== null) {
        res.status(202);
        res.send({
          success: true,
          isCompleted: true,
          message: "Profile verification is completed!",
        });
      } else {
        res.status(401);
        res.send({
          success: false,
          isCompleted: false,
          message: "Profile verification is not completed!",
        });
      }
    })
    .catch((err) => {
      res.status(400);
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
      if (student === null) {
        res.status(401);
        res.send({
          success: false,
          message: "account haven't created!",
          student: student,
        });
      } else {
        res.status(200);
        res.send({
          success: true,
          message: "request successful!",
          student: student,
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

module.exports = {
  upsert,
  isCompleted,
  details,
};
