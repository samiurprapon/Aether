const { v4: uuidv4 } = require("uuid");

const Sequelize = require("./index").Sequelize;
const Datatypes = require("./index").DataTypes;

const Course = require("./courses");


const Slide = Sequelize.define("slides", {
    id: {
      type: Datatypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: Datatypes.STRING,
      unique: false,
      allowNull: false,
    },
    url: {
      type: Datatypes.STRING,
      unique: false,
      allowNull: false,
    },
    cid: {
      type: Datatypes.UUID,
      allowNull: false,
  
      references: {
        model: Course,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  });

  module.exports = Slide;
  
