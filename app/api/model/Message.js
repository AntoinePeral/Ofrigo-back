const CoreModel = require("./CoreModel");

class Message extends CoreModel{
    static tableName = 'message';
    title;
    content;
    email;
    account;
    created_at;
    updated_at;

    constructor(obj){
        super(obj);
        this.id = obj.id;
        this.title = obj.title;
        this.content = obj.content;
        this.email = obj.email;
        this.account = obj.account;
        this.created_at = obj.created_at;
        this.updated_at = obj.updated_at;
    };
};

module.exports = Message;