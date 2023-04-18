const express = require("express");
const cors = require("cors");
const app = express();
const { account, category, ingredient, recipe, message, tag } = require("./api/router");
const { home } = require("./back/router");

app.set('view engine', 'ejs');
app.set('views', 'app/back/views');

app.use(cors());
app.use(express.json());
app.use(express.static('./app/back/asset'));

app.use(account, category, home, ingredient, recipe, message, tag);

module.exports = app;