const { v4: uuidv4 } = require("uuid");

const Credential = require("./credentials");

const Sequelize = require("./index").Sequelize;
const Datatypes = require("./index").DataTypes;

const Student = Sequelize.define("students", {
  id: {
    type: Datatypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
    allowNull: false,
  },
  studentID: {
    type: Datatypes.INTEGER,
    allowNull: true,
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
    unique: true,
    
    references: {
      model: Credential,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
});

module.exports = Student;
