const express = require("express");
const cors = require('cors');
const app = express();
const { account, category, ingredient, recipe, message, tag } = require("./api/router");

app.use(cors());
app.use(express.json());

app.use(account, category, ingredient, recipe, message, tag);

module.exports = app;