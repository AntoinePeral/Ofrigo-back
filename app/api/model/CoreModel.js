const debug = require("debug")("activeRecord");
const ofrigo = require("../client/client-db-ofrigo");

class CoreModel{
    id;
    
    constructor (obj) {
        this.id = obj.id;
    };

    /**
     * Returns all data from a table
     * @returns Return array
     */
    static async findAll () {
        const query = `SELECT * FROM "${this.tableName}";`;
        const result = [];
        let response;

        try {
            response = await ofrigo.query(query);
            debug(response.rows);

            for (const row of response.rows) {
                result.push(new this(row));
            }
        } catch (error) {
            console.log(error);
        }

        return result;
    };

    /**
     * Returns one data from a table
     * @param {int} id data id
     * @returns Return object
     */
    static async findOne (id) {
        const query = `SELECT * FROM ${this.tableName} WHERE id=${id};`;

        try {
            const response = await ofrigo.query(query);
            debug(response.rows[0]);

            return new this(response.rows[0]);
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Add in database
     * @param {Object} body 
     */
    async add (body) {
        const fields = []; 
        const values = [];
        let counter = 1;
        const parameters = [];

        Object.entries(this).forEach(([key,value])=>{
            console.log("this:::::",   this);
            if(key != "id"){
                fields.push(key);
                values.push(value);
                parameters.push(`$${counter}`);
                counter++;
            }
        });

        debug(this.constructor);

        const query = `INSERT INTO ${this.constructor.tableName} (${fields.join()}) VALUES (${parameters.join()}) RETURNING id;`;
        debug(query)
        let response;

        try {
            response = await ofrigo.query(query,values);
            debug(response);
            this.id = response.rows[0].id;
            debug(response.rows[0].id)
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Update in database
     * @param {Object} body 
     */
    async update (body) {
        const fields = []; 
        const values = [];
        let counter = 1;

        values.push(this.id);

        Object.entries(this).forEach(([key,value])=>{
            if(key != "id"){
                fields.push(key + "=$" + counter);
                values.push(value);
                counter++;
            }
        });

        const query = `UPDATE ${this.constructor.tableName} SET ${fields.join()} WHERE id='${this.id}';`;

        await ofrigo.query(query, values);
    };


    /**
     * Delete in database
     * @param {int} id 
     * @returns 
     */
    static async delete (id) {
        const query = {
            text: `DELETE FROM "${this.tableName}" WHERE "id"=$1;`,
            values: [id]
        };
        let response;

        try {
            response = await ofrigo.query(query);
        } catch (error) {
            console.log(error);
        }

        return response.rowCount;
    };
};

module.exports = CoreModel;