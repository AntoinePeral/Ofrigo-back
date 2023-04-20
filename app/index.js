const express = require("express");
const cors = require("cors");
const app = express();
const errorModule = require("./service/error/errorHandling");
const { account, authentification, category, ingredient, recipe, message, tag } = require("./api/router");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(account,authentification, category, ingredient, recipe, message, tag);
app.use(errorModule._404);
app.use(errorModule.manage);

module.exports = app;