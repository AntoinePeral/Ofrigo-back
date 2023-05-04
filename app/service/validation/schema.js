const Joi = require("joi");

const nameFormat = /^[a-zA-Z\u00C0-\u00FF-\-_]{2,100}$/u;
const emailFormat = /^[\w\-_]+(\.[\w\-_]+)?@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)?\.[a-z]{2,}$/u;
const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&\/$.#!?§:;+\-%])[A-Za-z\d!?:;@$!%*?&\/$.#%\-]{8,}$/u;
const roleFormat = /^(user|admin)$/u;
const titleFormat = /^[a-zA-Z0-9\u00C0-\u00FF-\s_,.!-'"?]{2,100}$/u;
const littleTitleFormat = /^[a-zA-Z0-9\u00C0-\u00FF-\s_,.!-'"?]{2,50}$/u;
const unitFormat = /^[a-z.à-ÿ]{1,20}$/u;

const adminAccountSchema = Joi.object({
    last_name: Joi.string().pattern(nameFormat).required().messages({
        'string.pattern.base': "Le nom ne respecte pas les caractères autorisés",
        'string.empty': 'Le champ nom ne doit pas être vide',
        'any.required': 'le champ nom est manquant'
    }),
    first_name: Joi.string().pattern(nameFormat).required().messages({
        'string.pattern.base': "Le prénom ne respecte pas les caractères autorisés",
        'string.empty': 'Le champ prénom ne peut pas être vide',
        'any.required': 'le champ prénom est manquant'
    }),
    email: Joi.string().pattern(emailFormat).required().messages({
        'string.pattern.base': "Format de l'email non valide ou caractères non autorisés",
        'string.empty': 'L\'email ne peut pas être vide',
        'any.required': 'L\'email est manquant'
    }),
    password: Joi.string().pattern(passwordFormat).required().messages({
        'string.pattern.base': "Le mot de passe doit contenir une majuscule, une minuscule, un caractère spécial et au minimum 8 caractères",
        'string.empty': 'Le champ mot de passe ne peut pas être vide',
        'any.required': 'le champ mot de passe est manquant'
    }),
    confirm_password: Joi.string().pattern(passwordFormat).required().messages({
        'string.pattern.base': "Le mot de passe doit contenir une majuscule, une minuscule, un caractère spécial et au minimum 8 caractères",
        'string.empty': 'Le champ mot de passe ne peut pas être vide',
        'any.required': 'le champ mot de passe est manquant'
    }),
    role: Joi.string().pattern(roleFormat).required().messages({
        'string.pattern.base': "Le rôle ne correspond pas à admin ou à user",
        'string.empty': 'Le champ rôle ne peut pas être vide',
        'any.required': 'Le champ rôle est manquant'
    })
});

const userAccountSchema = Joi.object({
    last_name: Joi.string().pattern(nameFormat).required().messages({
        'string.pattern.base': "Le nom ne respecte pas les caractères autorisés",
        'string.empty': 'Le champ nom ne doit pas être vide',
        'any.required': 'le champ nom est manquant'
    }),
    first_name: Joi.string().pattern(nameFormat).required().messages({
        'string.pattern.base': "Le prénom ne respecte pas les caractères autorisés",
        'string.empty': 'Le champ prénom ne peut pas être vide',
        'any.required': 'le champ prénom est manquant'
    }),
    email: Joi.string().pattern(emailFormat).required().messages({
        'string.pattern.base': "Format de l'email non valide ou caractères non autorisés",
        'string.empty': 'Le email ne peut pas être vide',
        'any.required': 'le email est manquant'
    }),
    password: Joi.string().pattern(passwordFormat).required().messages({
        'string.pattern.base': "Couple email/mot de pass incorrect",
        'string.empty': 'Le champ mot de passe ne peut pas être vide',
        'any.required': 'Le champ mot de passe est manquant'
    })
});

const categorySchema = Joi.object({
    label: Joi.string().pattern(titleFormat).required().messages({
        'string.pattern.base': "Le label ne respecte pas le nombre de caractère (max100) ou caractères non autorisés",
        'string.empty': 'Le champ label ne peut pas être vide',
        'any.required': 'Le champ label est manquant'
    }),
});

const ingredientSchema = Joi.object({
    label: Joi.string().pattern(titleFormat).required().messages({
        'string.pattern.base': "Le label ne respecte pas le nombre de caractère (max100) ou caractères non autorisés",
        'string.empty': 'Le champ label ne peut pas être vide',
        'any.required': 'Le champ label est manquant'
    }),
    // picture: Joi.string().required(),
    unit: Joi.string().allow(null, '').pattern(unitFormat).messages({
        'string.pattern.base': "Les unités de mesure ne respecte pas le nombre de caractère (max20) ou caractères non autorisés"
        // 'string.empty': 'Le champ unités de mesure ne peut pas être vide'
    }),
    category_id: Joi.number().allow(null, '').messages({
        'any.empty': 'Le champ catégorie ne peut pas être vide',
        'number.min': 'Un ingrédient doit être associé à une catégorie',
        'any.required': 'Le champ catégorie est manquant'
    }),
});

const messageSchema = Joi.object({
    label: Joi.string().pattern(titleFormat).required().messages({
        'string.pattern.base': "Le titre ne respecte pas le nombre de caractère (max100) ou caractères non autorisés",
        'string.empty': 'Le champ titre ne peut pas être vide',
        'any.required': 'Le champ titre est manquant'
    }),
    content: Joi.string().min(20).max(1000).required().messages({
        'string.empty': 'Le champ contenu ne peut pas être vide',
        'string.min': 'Le champ contenu ne peut pas être inférieur à 20 caractères',
        'string.max': 'Le champ contenu ne peut pas dépassé 1000 caractères',
        'any.required': 'le champ contenu est manquant'
    }),
    email: Joi.string().pattern(emailFormat).required().messages({
        'string.pattern.base': "Format de l'email non valide ou caractères non autorisés",
        'string.empty': 'Le champ email ne peut pas être vide',
        'any.required': 'le champ email est manquant'
    }),
});

const messageSchemaUser = Joi.object({
    label: Joi.string().pattern(titleFormat).required().messages({
        'string.pattern.base': "Le titre ne respecte pas le nombre de caractère (max100) ou caractères non autorisés",
        'string.empty': 'Le champ titre ne peut pas être vide',
        'any.required': 'Le champ titre est manquant'
    }),
    content: Joi.string().min(20).max(1000).required().messages({
        'string.empty': 'Le champ contenu ne peut pas être vide',
        'string.min': 'Le champ contenu ne peut pas être inférieur à 20 caractères',
        'string.max': 'Le champ contenu ne peut pas dépassé 1000 caractères',
        'any.required': 'le champ contenu est manquant'
    })
});

const tagSchema = Joi.object({
    label: Joi.string().pattern(littleTitleFormat).required().messages({
        'string.pattern.base': "Le label ne respecte pas le format (max50) ou caractères non autorisés",
        'string.empty': 'Le champ label ne peut pas être vide',
        'any.required': 'Le champ label est manquant'
    }),
});

const stepSchema = Joi.object({
    content: Joi.string().min(20).max(1000).required().messages({
        'string.pattern.base': "Le label ne respecte pas le format (max100) ou caractères non autorisés",
        'string.empty': 'Le champ label ne peut pas être vide',
        'any.required': 'Le champ label est manquant'
    }),
    number: Joi.number().min(1).max(40).required().messages({
        'number.min': 'Une étape minimum est requise',
        'number.max': 'Vous ne pouvez pas dépâsser 40 étapes',
        'any.required': 'Le numéro de l\'étape est manquant'
    }),
    recipe_id: Joi.number().min(1).required().messages({
        'number.min': 'Une recette minimum est requise',
        'any.required': 'Aucune recette sélectionnée'
    }),
});

const account_has_ingredientSchema = Joi.object({
    ingredient_id: Joi.number().min(1).required().messages({
        'number.empty': 'Un ingrédient doit être sélectionné',
        'any.required': 'Un ingrédient est requis'
    }),
});

const recipe_has_ingredient_with_quantity = Joi.object({
    recipe_id: Joi.number().min(1).required().messages({
        'number.min': 'Une recette minimum est requise',
        'any.required': 'Aucune recette sélectionnée'
    }),
    ingredient_id: Joi.number().min(1).required().messages({
        'number.min': 'Un ingrédient minimum est requis',
        'any.required': 'Aucun ingrédient sélectionné'
    }),
    ingredient_quantity: Joi.number().min(1).max(5000000).messages({
        'number.min': 'La quantité minimal pour un ingrédient est 1',
        'number.max': 'La quantité maximal pour un ingrédient est 5,000,000',
        'any.required': 'Aucune quantité sélectionnée'
    }),
});

const recipe_has_tag = Joi.object({
    recipe_id: Joi.number().min(1).required().messages({
        'number.min': 'Une recette minimum est requise',
        'any.required': 'Aucune recette sélectionnée'
    }),
    tag_id: Joi.number().min(1).required().messages({
        'number.min': 'Un tag minimum est requis',
        'any.required': 'Aucun tag sélectionné'
    }),
});

const recipeSchema = Joi.object({
    label: Joi.string().required().messages({
        'any.required': 'Le champ label est manquant'
    }),
    picture: Joi.string().required().messages({
        'any.required': 'Le champ picture est manquant'
    }),
    rate: Joi.string().required().messages({
        'any.required': 'Le champ rate est manquant'
    }),
    difficulty: Joi.string().required().messages({
        'any.required': 'Le champ difficulty est manquant'
    }),
    time: Joi.string().required().messages({
        'any.required': 'Le champ time est manquant'
    }),
    ingredient: Joi.array().items(ingredientSchema),
    step: Joi.array().items(stepSchema),
    tag: Joi.array().items(tagSchema)
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailFormat).required().messages({
        'string.pattern.base': "Format de l'email non valide ou caractères non autorisés",
        'string.empty': 'L\'email ne peut pas être vide',
        'any.required': 'L\'email est manquant'
    }),
    password: Joi.string().pattern(passwordFormat).required().messages({
        'string.pattern.base': "Le mot de passe doit contenir une majuscule, une minuscule, un caractère spécial et au minimum 8 caractères",
        'string.empty': 'Le champ mot de passe ne peut pas être vide',
        'any.required': 'le champ mot de passe est manquant'
    })
});



module.exports =  { 
    adminAccountSchema,
    userAccountSchema, 
    categorySchema,
    ingredientSchema,
    loginSchema,
    messageSchema,
    messageSchemaUser,
    tagSchema,
    stepSchema,
    account_has_ingredientSchema,
    recipe_has_ingredient_with_quantity,
    recipe_has_tag,
    recipeSchema
 };