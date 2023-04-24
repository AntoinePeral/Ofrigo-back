const CoreModel = require("./CoreModel");

class Ingredient extends CoreModel{
    static tableName = 'ingredient';
    label;
    unit;
    category_id;
    category;
    created_at;
    updated_at;

    constructor(obj){
        super(obj);
        this.label = obj.label;
        this.unit = obj.unit;
        this.category_id = obj.category_id;
        this.category = obj.category;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
    };

    static async findAllIngredientUser (accountId){
        const query = {
            text: `SELECT i.* FROM ingredient i
            JOIN account_has_ingredient ai
            ON ai.ingredient_id=i.id
            WHERE ai.account_id=$1`,
            values: [accountId]
        };
        let response;

        try{
            response = await ofrigo.query(query);
            return response.rows;
        }catch(error){
            console.log(error);
        }
    };

    static async findOneIngredientUser (accountId, ingredientId){
        const query = {
            text: `SELECT i.* FROM ingredient i
            JOIN account_has_ingredient ai
            ON ai.ingredient_id=i.id
            WHERE ai.account_id=$1
            AND i.id=$2`,
            values: [accountId, ingredientId]
        };
        let response;

        try{
            response = await ofrigo.query(query);
            return response.rows[0];
        }catch(error){
            console.log(error);
        }
    };
};

module.exports = Ingredient;