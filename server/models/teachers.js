const { v4: uuidv4 } = require("uuid");

const Credential = require("./credentials");
const Course = require("./courses");

const Sequelize = require("./index").Sequelize;
const Datatypes = require("./index").DataTypes;

const Teacher = Sequelize.define("teachers", {
  id: {
    type: Datatypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
    allowNull: false,
  },
  initial: {
    type: Datatypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: Datatypes.STRING,
    allowNull: true,
  },
  sex: {
    type: Datatypes.STRING,
    allowNull: false,
    defaultValue: "male",
  },
  uid: {
    type: Datatypes.UUID,
    allowNull: false,

    references: {
      model: Credential,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});

Teacher.hasMany(Course, {
  foreignKey: "tid",
  targetKey: "id",
});

module.exports = Teacher;
