const CoreModel = require("./CoreModel");

class Category extends CoreModel{
    static tableName = 'category';
    label;
    ingredient;
    created_at;
    updated_at;
    
    constructor(obj){
        super(obj);
        this.id = obj.id;
        this.label = obj.label;
        this.ingredient = obj.ingredient;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
    };
};

module.exports = Category;