const CoreModel = require("./CoreModel");

class Ingredient extends CoreModel{
    static tableName = 'ingredient';
    label;
    unit;
    category_id;
    created_at;
    updated_at;

    constructor(obj){
        super(obj);
        this.label = obj.label;
        this.unit = obj.unit;
        this.category_id = obj.category_id;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
    };
};

module.exports = Ingredient;