const Course = require("../models/courses");

const add = (req, res) => {
  let user = res.locals.user;

  if (user.type !== "teacher") {
    res.status(400);
    res.send({
      success: false,
      message: "you are not authorized to add courses!",
    });
  }

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
        success: true,
        message: "Course section created successfully!",
        course: course,
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

const list = (req, res) => {
  let user = res.locals.user;

  Course.findAll({
    where: {
      uid: user.uid,
    },
  })
    .then((courses) => {
      res.status(200);
      res.send({
        courses: courses,
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

const update = (req, res) => {
  let user = res.locals.user;

  if (user.type !== "teacher") {
    res.status(400);
    res.send({
      success: false,
      message: "you are not authorized to make changes!",
    });
  }

  Course.update(
    {
      code: req.body.code,
      section: req.body.section,
      name: req.body.name,
      semester: req.body.semester,
    },
    {
      where: {
        id: req.body.id,
        uid: user.uid,
      },
    }
  )
    .then((course) => {
      res.status(201);
      res.send({
        success: true,
        message: "Course section created successfully!",
        course: course,
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

const remove = (req, res) => {
  let user = res.locals.user;

  if (user.type !== "teacher") {
    res.status(400);
    res.send({
      success: false,
      message: "you are not authorized to make changes!",
    });
  }

  Course.findOne({
    where: {
      uid: user.uid,
      id: req.body.id,
    },
  })
    .then((course) => {
      return course.destroy();
    })
    .then((result) => {
      res.status(200);
      res.send({
        message: "deleted successful!",
      });
    })
    .catch((err) => {
      res.status(400);
      res.send({
        message: err.message,
      });
    });
};

const archived = (req, res) => {
  let user = res.locals.user;

  if (user.type !== "teacher") {
    res.status(400);
    res.send({
      success: false,
      message: "you are not authorized to make changes!",
    });
  }

  Course.update(
    {
      archived: req.body.archived,
    },
    {
      where: {
        uid: user.uid,
        id: req.body.id,
      },
    }
  )
    .then((course) => {
      res.status(200);
      res.send({
        success: true,
        message: "archived successful!",
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
  add,
  list,
  update,
  remove,
  archived,
};
