const CoreModel = require("./CoreModel");

class Tag extends CoreModel{
    static tableName = 'tag';
    label;
    recipe;
    created_at;
    updated_at;
    
    constructor(obj){
        super(obj);
        this.id = obj.id;
        this.label = obj.label;
        this.recipe = obj.recipe;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
    };
};

module.exports = Tag;