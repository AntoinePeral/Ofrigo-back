const CoreModel = require("./CoreModel");

class Step extends CoreModel{
    static tableName = 'step';
    number;
    content;

    constructor(obj){
        super(obj);
        this.id = obj.id;
        this.number = obj.number;
        this.content = obj.content;
    };
};

module.exports = Step;