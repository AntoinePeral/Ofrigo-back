const CoreModel = require("./CoreModel");
const ofrigo = require("../client/client-db-ofrigo");

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

    /**
     * delete a recipe from a tag
     * @param {*} tag_id 
     * @param {*} recipe_id 
     * @returns a validation of the deletion
     */
    static async deleteRecipeFromTag (tag_id, recipe_id) {
        const query = {
            text: `DELETE FROM recipe_has_tag WHERE tag_id=$1 AND recipe_id=$2;`,
            values: [tag_id, recipe_id]
        };
        let response;

        try{
            response = await ofrigo.query(query);
            return response.rowCount;
        }catch(error){
            console.log(error);
        }
    };
    
};

module.exports = Tag;