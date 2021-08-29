const Course = require("../models/courses");
const Teacher = require("../models/teachers");

const add = (req, res) => {
  let teacher = res.locals.teacher;

  Course.create({
    code: req.body.code,
    section: req.body.section,
    name: req.body.name,
    semester: req.body.semester,
    tid: teacher.id,
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
  let teacher = res.locals.teacher;
  let archive = false;

  if (req.body.archived) {
    archive = req.body.archived;
  }

  Course.findAll({
    where: {
      tid: teacher.id,
      archived: archive,
    },
  })
    .then((courses) => {
      res.status(200);
      res.send({
        success: true,
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
  let teacher = res.locals.teacher;

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
        tid: teacher.id,
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
  let teacher = res.locals.teacher;

  Course.findOne({
    where: {
      tid: teacher.id,
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
  let teacher = res.locals.teacher;

  Course.update(
    {
      archived: req.body.archived,
    },
    {
      where: {
        tid: teacher.id,
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
