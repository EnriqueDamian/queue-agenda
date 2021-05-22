const express = require("express");
const oauthServer = require("oauth2-server");


/* const bodyParser = require("body-parser");//d */
const foodRouter = require("./routes/foodRoutes");
/* const authenticate = require("./components/oauth/authenticate"); */

const app = express();
const Request = oauthServer.Request;
const esponse = oauthServer.Response;


app.use(express.json());
/* app.use(express.urlencoded({extended: true})); */

app.use("/api/food", foodRouter);

module.exports = app;
