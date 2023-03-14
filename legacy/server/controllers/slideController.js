const Course = require("../models/courses");
const Slide = require("../models/slides");

// only teacher can upload
const upload = (req, res) => {
  let user = res.locals.user;

  if (!req.file) {
    res.send({
      message: "No file found!",
    });

    return;
  } else {
    Course.findOne({
      where: {
        uid: user.id,
      },
    })
      .then((course) => {
        Slide.create({
          title: req.file.filename,
          cid: req.body.cid,
          url: req.file.path,
        })
          .then((slide) => {
            res.status(201);
            res.send({
              message: "Slide uploaded successfully!",
              slide: slide,
            });
          })
          .catch((err) => {
            res.status(400);
            res.send({
              message: "Slide upload failed!",
            });
          });
      })
      .catch((err) => {
        res.status(403);
        res.send({
          message: "Access denied!",
        });
      });
  }
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
        message: "Deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(400);
      res.send({
        message: "Delete action failed!",
      });
    });
};

// teacher and student both can access
const list = (req, res) => {
  Slide.findAll({
    where: {
      cid: req.body.cid,
    },
  })
    .then((slides) => {
      res.status(200);
      res.send({
        slides: slides,
      });
    })
    .catch((err) => {
      res.status(400);
      res.send({ 
        message: "No slides found!"
       });
    });
};

module.exports = {
  upload,
  list,
  remove,
};
