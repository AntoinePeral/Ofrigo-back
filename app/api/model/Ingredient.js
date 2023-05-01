const CoreModel = require("./CoreModel");
const ofrigo = require("../client/client-db-ofrigo");

class Ingredient extends CoreModel{
    static tableName = 'ingredient';
    label;
    picture;
    unit;
    category_id;
    category;
    created_at;
    updated_at;

    constructor(obj){
        super(obj);
        this.label = obj.label;
        this.picture = obj.picture;
        this.unit = obj.unit;
        this.category_id = obj.category_id;
        this.category = obj.category;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
    };

    /**
     * Get all ingredients at user stock
     * @param {int} accountId 
     * @returns an instance
     */
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

    /**
     * Get one ingredients at user stock
     * @param {int} accountId 
     * @param {int} ingredientId 
     * @returns 
     */
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

    static async findAllIngredientCategory(category_id) {
        const query = {
            text: `SELECT * FROM ingredient WHERE category_id=$1;`,
            values: [category_id]
        };
        const result = [];
        let response;

        try{
            response = await ofrigo.query(query);

            if(response.rowCount > 0){
                for (const row of response.rows) {
                    result.push(new this(row));
                }
            }
            else{
                return new this(response.rows[0])
            }
            
            return result;
        }catch(error){
            console.log(error);
        }
    };

};

module.exports = Ingredient;