const express = require("express");

// port number
const portNumber = process.env.PORT || 3000;

// initialize express
const app = express();

// start server
app.listen(portNumber, () => {
  console.log("Server started on port : " + portNumber);
});