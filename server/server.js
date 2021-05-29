// import modules
const express = require("express");
const Sequelize = require("./models/index").Sequelize;
const cors = require("cors");
const multer = require("multer");

// middlewares
const storage = require("./middlewares/fileUploadMiddleware");

// routes
const authRoutes = require("./routes/authRoutes");

// server config
const serverConfig = require("./config/databaseSecrets.json");

// initialize express
const server = express();
const port = process.env.PORT || serverConfig.PORT;

// middleWares
// file uploading type and storage location
server.use("/public/", express.static("public/"));
server.use(multer({ storage: storage }).single("pdf"));
server.use(express.json());
server.use(
  express.urlencoded({
    extended: true,
  })
);

server.use(cors());

// routing
server.use("/api/auth", authRoutes.router);

Sequelize.sync({
  force: false,
})
  .then(() => {
    server.listen(port, () => {
      console.log("Server started on :" + port);
    });
  })
  .catch((error) => {
    if (error.message.includes("Unknown database")) {
      console.log("Create Database Manually");
    }
  });
