const CoreModel = require("./CoreModel");

class Message extends CoreModel{
    static tableName = 'message';
    label;
    content;
    email;
    account;
    created_at;
    updated_at;

    constructor(obj){
        super(obj);
        this.id = obj.id;
        this.label = obj.label;
        this.content = obj.content;
        this.email = obj.email;
        this.account = obj.account;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
    };

    async findAllMessageUser (){
        const query = {
            text: `SELECT * FROM message WHERE email=$1`,
            values: [this.email]
        };

        let response;

        try{
            response = await ofrigo.query(query);
            return response.rows;
        }catch(error){
            console.log(error);
        }
    };

    async findOneMessageUser (messageId){
        const query = {
            text: `SELECT * FROM message WHERE email=$1 AND id=$2`,
            values: [this.email, messageId]
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

module.exports = Message;