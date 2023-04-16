const express = require("express");
const app = express();
const { account, category, ingredient, recipe, message, tag } = require("./api/router");

app.use(express.json());

app.use(account, category, ingredient, recipe, message, tag);

module.exports = app;