const Session = require("../models/sessions");
const Slide = require("../models/slides");
const Student = require("../models/students");

const reading = (req, res) => {
  let user = res.locals.user;

  Session.create({
    slideId: req.body.slideId,
    start: req.body.startTime,
    end: req.body.endTime,
    uid: user.uid,
  })
    .then((session) => {
      res.status(201);
      res.send();
    })
    .catch((err) => {
      res.status(403);
      res.send();
    });
};

module.exports = {
  reading,
};
