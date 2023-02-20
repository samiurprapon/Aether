const Teacher = require("../models/teachers");
const User = require("../models/users");

const upsert = async (req, res) => {
  let teacher = res.locals.data;

  var { initial, name, sex } = req.body;

  if (teacher.user.sex !== sex) {
    await User.update({
      sex: sex
    },
      {
        where: {
          id: teacher.user.id
        }
      })
  }

  return await Teacher.update({
    initial: initial,
    name: name,
    sex: sex,
  }, {
    where: {
      id: teacher.details.id
    }
  })
    .then(() => {

      return res.status(200).json({
        success: true,
        message: "Teacher Profile updated!",
      })
    })
    .catch((err) => {
      return res.status(403).json({
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
        res.status(202);
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

const details = async (req, res) => {
  let teacherId = res.locals.data.details.id;

  return await Teacher.findOne({
    where: {
      id: teacherId,
    },
    logging: false,
    raw: true
  })
    .then((teacher) => {
      return res.status(200).json({
        success: true,
        message: "request successful!",
        teacher: teacher,
      })
    })
    .catch((err) => {
      return res.status(400).json({
        success: true,
        message: err.message,
      })
    });
};

module.exports = {
  upsert,
  isCompleted,
  details,
};
