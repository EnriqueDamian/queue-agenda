require("dotenv").config();
const app = require("./app");
const http = require("http");
const mongoose = require("mongoose");

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@nomanacola.k2ywv.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    server.listen(PORT);
  })
  .catch((erro) => {
    console.log(erro);
  });
