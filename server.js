const dotenv = require("dotenv");
dotenv.config();
const debug = require("debug")("express");
const app = require("./app/index");

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, ()=>{
    debug(`Server running on port: ${PORT}`);
});