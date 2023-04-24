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

    async addIngredient(ingredient_id, quantity = null){
        const query = {
            text: `INSERT INTO recipe_has_ingredient_with_quantity(recipe_id, ingredient_id, ingredient_quantity) VALUES ($1, $2, $3) RETURNING *;`,
            values: [this.id, ingredient_id, quantity]
        };
        let response;

        try{
            response = await ofrigo.query(query);
            return response.rows[0];
        }catch(error){
            console.log(error);
        }
    };

    async updateIngredient(ingredient_id, quantity = null){
        const query = {
            text: `UPDATE recipe_has_ingredient_with_quantity SET ingredient_id=$1, ingredient_quantity=$2 WHERE recipe_id=$3 AND ingredient_id=$4 RETURNING *;`,
            values: [ingredient_id, quantity, this.id, ingredient_id]
        };
        let response;

        try{
            response = await ofrigo.query(query);
            return response.rows[0];
        }catch(error){
            console.log(error);
        }
    };

    async removeIngredient(ingredient_id){
        const query = {
            text: `DELETE FROM "recipe_has_ingredient_with_quantity" WHERE "recipe_id"=$1 AND "ingredient_id"=$2;`,
            values: [this.id, ingredient_id]
        };
        let response;

        try {
            response = await ofrigo.query(query);
            debug(response)
        } catch (error) {
            console.log("Erreur");
        }

        return response.rowCount;
    };

};

module.exports = Recipe;