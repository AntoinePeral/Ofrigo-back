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

    /**
     * Returns all recipe whit ingredient, step and tag
     * @returns Return array
     */
    static async findAllRecipeWithAll () {
        const query = `SELECT * FROM getAllRecipe()`;

        const result = [];

        try {
            const recipes = await ofrigo.query(query);
            debug(recipes.rows);

            for (const recipe of recipes.rows) {
                result.push(new this(recipe)); 
            }
        } catch (error) {
            console.log(error);
        }

        return result;
    };

    /**
     * Returns one recipe whit ingredient, step and tag
     * @param {int} id data id
     * @returns Return object
     */
    static async findOneRecipeWithAll (id) {
        const query = `SELECT * FROM getOneRecipe(${id})`;

        try {
            const recipe = await ofrigo.query(query);
            debug(recipe.rows[0]);

            return new this(recipe.rows[0]);
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = Recipe;