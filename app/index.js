const express = require("express");
const app = express();
const cors = require("cors");
const errorModule = require("./service/error/errorHandling");
const { account, authentification, category, ingredient, recipe, message, tag } = require("./api/router");

app.use(cors());
app.use(express.json());

app.use(account, category, ingredient, recipe, message, tag);
app.use(errorModule._404);
app.use(errorModule.manage);

module.exports = app;