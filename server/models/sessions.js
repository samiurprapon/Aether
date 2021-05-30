const { v4: uuidv4 } = require("uuid");

const Student = require("./students");
const Slide = require("./slides");

const Sequelize = require("./index").Sequelize;
const Datatypes = require("./index").DataTypes;

const Session = Sequelize.define("sessions", {
  id: {
    type: Datatypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
    allowNull: false,
  },
  slideId: {
    type: Datatypes.UUID,
    allowNull: false,

    references: {
      model: Slide,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  start: {
    type: Datatypes.DATE,
    allowNull: false,
  },
  end: {
    type: Datatypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  uid: {
    type: Datatypes.UUID,
    allowNull: false,

    references: {
      model: Student,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});

module.exports = Session;
