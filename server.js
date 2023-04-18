const dotenv = require("dotenv");
dotenv.config();
const debug = require("debug")("express");
const app = require("./app/index");

app.get("/", (_,res)=>{
    res.send("O'Frigo");
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, ()=>{
    debug(`Server running on port: ${PORT}`);
});