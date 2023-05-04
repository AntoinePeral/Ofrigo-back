const CoreModel = require("./CoreModel");
const ofrigo = require("../client/client-db-ofrigo");

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

    /**
     * Delete a step from a recipe
     * @param {*} step_id 
     * @returns a validation of the deletion
     */
    static async deleteStepFromRecipe (step_id){
        const query = {
            text: `DELETE FROM step WHERE id=$1;`,
            values: [step_id]
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

module.exports = Step;