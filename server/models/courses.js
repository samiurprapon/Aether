const { v4: uuidv4 } = require("uuid");
const { nanoid } = require('nanoid')

const Teacher = require("./teachers");

const Sequelize = require("./index").Sequelize;
const Datatypes = require("./index").DataTypes;

const Course = Sequelize.define("courses", {
  id: {
    type: Datatypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
    allowNull: false,
  },
  code: {
    type: Datatypes.STRING,
    allowNull: false,
  },
  section: {
    type: Datatypes.STRING,
    allowNull: false,
  },
  enroll: {
    type: Datatypes.STRING,
    allowNull: false,
    defaultValue: () => nanoid(6),
    unique: true,
  },
  name: {
    type: Datatypes.STRING,
    allowNull: true,
  },
  semester: {
    type: Datatypes.STRING,
    allowNull: true,
  },

  uid: {
    type: Datatypes.UUID,
    allowNull: false,

    references: {
      model: Teacher,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});

module.exports = Course;
