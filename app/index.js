const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');
const errorModule = require("./service/error/errorHandling");
const middlewares = require("./service/middleware");
const { account, login, category, ingredient, recipe, message, tag } = require("./api/router");
const { loginAdmin, homeRouter, categoryRouter, ingredientRouter, messageRouter, tagRouter, accountRouter, recipeRouter } = require("./back/router");
const {  home } = require("./back/controller");
const session = require('express-session');

app.use(session({
    secret: 'votre_secret',
    resave: false,
    saveUninitialized: true
  }));

app.set('view engine', 'ejs');
app.set('views', 'app/back/views');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static("./app/back/asset"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_,res)=>{
    res.send("O'Frigo");
});

app.use(
  account,
  login, 
  category, 
  ingredient, 
  recipe, 
  message, 
  tag, 
);
app.use(middlewares.setupSession);
app.use(middlewares.addUserToLocals);
app.use(
  loginAdmin, 
  homeRouter, 
  categoryRouter, 
  ingredientRouter, 
  messageRouter, 
  tagRouter,
  recipeRouter,
  accountRouter,
);

app.use(home.menu, errorModule._404);
app.use(errorModule.manage);

module.exports = app;