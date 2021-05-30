const { v4: uuidv4 } = require("uuid");
const { nanoid } = require("nanoid");

const Teacher = require("./teachers");
const Student = require("./students");

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
    unique: false,
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
  archived: {
    type: Datatypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
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

Course.belongsToMany(Student, { through: "studentCourses" });
Student.belongsToMany(Course, { through: "studentCourses" });

module.exports = Course;
