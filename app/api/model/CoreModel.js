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
};

module.exports = CoreModel;