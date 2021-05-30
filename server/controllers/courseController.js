const Course = require("../models/courses");

const add = (req, res) => {
  let user = res.locals.user;

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
        message: "Course section created successfully!",
        course: course,
      });
    })
    .catch((err) => {
      res.status(400);
      res.send({
        message: "creating course failed!",
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
      res.send({ error: "true" });
    });
};

const update = (req, res) => {
  let user = res.locals.user;

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
        message: "Course section created successfully!",
        course: course,
      });
    })
    .catch((err) => {
      res.status(400);
      res.send({
        message: "creating course failed!",
      });
    });
};

const remove = (req, res) => {
  let user = res.locals.user;

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
        message: "delete action failed!",
      });
    });
};

const archived = (req, res) => {
  let user = res.locals.user;

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
        message: "archived successful!",
      });
    })
    .catch((err) => {
      res.status(400);
      res.send({
        message: "delete action failed!",
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
