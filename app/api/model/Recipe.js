const debug = require("debug")("activeRecord");
const ofrigo = require("../client/client-db-ofrigo");
const CoreModel = require("./CoreModel");

class Recipe extends CoreModel{
    static tableName = 'recipe';
    label;
    picture;
    rate;
    difficulty;
    time;
    ingredient;
    step;
    tag;
    created_at;
    updated_at;

    constructor(obj){
        super(obj);
        this.label = obj.label;
        this.picture = obj.picture;
        this.rate = obj.rate;
        this.difficulty = obj.difficulty;
        this.time = obj.time;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
        this.ingredient = obj.ingredient;
        this.step = obj.step;
        this.tag = obj.tag;
    };
};

module.exports = Recipe;