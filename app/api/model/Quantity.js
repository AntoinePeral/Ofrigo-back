const CoreModel = require("./CoreModel");

class Quantity extends CoreModel{
    static tableName = 'quantity';
    ingredient_quantity;

    constructor(obj){
        super(obj);
        this.id = obj.id;
        this.ingredient_quantity = obj.ingredient_quantity;
    };
};

module.exports = Quantity;