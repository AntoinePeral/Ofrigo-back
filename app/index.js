const express = require("express");
const cors = require("cors");
const app = express();
const errorModule = require("./service/error/errorHandling");
const { account, login, category, ingredient, recipe, message, tag } = require("./api/router");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_,res)=>{
    res.send("O'Frigo");
});

app.use(account, login, category, ingredient, recipe, message, tag);
app.use(errorModule._404);
app.use(errorModule.manage);

module.exports = app;