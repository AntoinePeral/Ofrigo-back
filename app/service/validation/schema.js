const Joi = require("joi");

const nameFormat = /^[a-zA-Z\u00C0-\u00FF-]{2,100}$/u;
const emailFormat = /^[a-zA-Z\u00C0-\u00FF ]*$/u;
const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&\/$.#!?§:;+\-%])[A-Za-z\d!?:;@$!%*?&\/$.#%\-]{8,}$/u;
const roleFormat = /^(user|admin)$/u;
const titleFormat = /^[a-zA-Z0-9_,.!-]{2,100}$/u;
const unitFormat = /^[a-z.à-ÿ]{1,20}$/u;

const accountSchema = Joi.object({
    last_name: Joi.string().pattern(nameFormat).required(),
    first_name: Joi.string().pattern(nameFormat).required(),
    email: Joi.string().pattern(emailFormat).required(),
    password: Joi.string().pattern(passwordFormat).required(),
    role: Joi.string().pattern(roleFormat).required()
});

const categorySchema = Joi.object({
    label: Joi.string().pattern(titleFormat).required()
});

const ingredientSchema = Joi.object({
    label: Joi.string().pattern(titleFormat).required(),
    unit: Joi.string().pattern(unitFormat),
    category_id: Joi.number().min(1).required()
});

const messageSchema = Joi.object({
    title: Joi.string().pattern(titleFormat).required(),
    content: Joi.string().min(20).max(1000).required(),
    email: Joi.string().pattern(emailFormat).required()
});

const tagSchema = Joi.object({
    label: Joi.string().pattern(titleFormat).required()
});

const stepSchema = Joi.object({
    content: Joi.string().min(20).max(1000).required(),
    number: Joi.number().min(1).max(40).required(),
    recipe_id: Joi.number().min(1).required()
});

const account_has_ingredientSchema = Joi.object({
    account_id: Joi.string().min(1).required(),
    ingredient_id: Joi.string().min(1).required()
});

const recipe_has_ingredient_with_quantity = Joi.object({
    recipe_id: Joi.number().min(1).required(),
    ingredient_id: Joi.number().min(1).required(),
    ingredient_quantity: Joi.number().min(1).max(5000000)
});

const recipe_has_tag = Joi.object({
    recipe_id: Joi.number().min(1).required(),
    tag_id: Joi.number().min(1).required()
});

module.exports =  { 
    accountSchema, 
    categorySchema,
    ingredientSchema,
    messageSchema,
    tagSchema,
    stepSchema,
    account_has_ingredientSchema,
    recipe_has_ingredient_with_quantity,
    recipe_has_tag
 };