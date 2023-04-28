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

    // async addIngredientIntoCategory(label, ingredient){
    //     const query = {
    //         text: `INSERT INTO category (label, ingredient) VALUES ($1, $2) RETURNING *;`,
    //         values: [label, ingredient]
    //     };
    //     let response;

    //     try{
    //         response = await ofrigo.query(query);
    //         return response.rows[0];
    //     }catch(error){
    //         console.log(error);
    //     }
    // };
};

module.exports = Category;