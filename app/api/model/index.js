const Account = require("./Account");
const Category = require("./Category");
const Ingredient = require("./Ingredient");
const Message = require("./Message");
const Quantity = require("./Quantity");
const Recipe = require("./Recipe");
const Step = require("./Step");
const Tag = require("./Tag");

// Account <-> Ingredient

Account.belongsToMany(Ingredient, {
    foreignKey: "account_id",
    otherKey: "ingredient_id",
    as: "accountIngredient",
    through: "account_has_ingredient"
});

Ingredient.belongsToMany(Account, {
    foreignKey: "ingredient_id",
    otherKey: "account_id",
    as: "ingredientAccount",
    through: "account_has_ingredient"
});

// Ingredient <-> Category

Ingredient.belongsTo(Category, {
    foreignKey: "category_id",
    as: "ingredientCategory"
});

Category.hasMany(Ingredient, {
    foreignKey: "category_id",
    as: "categoryIngredient"
});

// Recipe <-> Ingredient

Recipe.belongsToMany(Ingredient, {
    foreignKey: "recipe_id",
    otherKey: "ingredient_id",
    as: "recipeIngredient",
    through: "recipe_has_ingredient_with_quantity"
});

Ingredient.belongsToMany(Recipe, {
    foreignKey: "ingredient_id",
    otherKey: "recipe_id",
    as: "ingredientRecipe",
    through: "recipe_has_ingredient_with_quantity"
});

// Recipe <-> Quantity

Recipe.belongsToMany(Quantity, {
    foreignKey: "recipe_id",
    otherKey: "ingredient_id",
    as: "recipeQuantity",
    through: "recipe_has_ingredient_with_quantity"
});

Quantity.belongsToMany(Recipe, {
    foreignKey: "ingredient_id",
    otherKey: "recipe_id",
    as: "quantityRecipe",
    through: "recipe_has_ingredient_with_quantity"
});

// Recipe <-> Tag

Recipe.belongsToMany(Tag, {
    foreignKey: "recipe_id",
    otherKey: "tag_id",
    as: "recipeTag",
    through: "recipe_has_tag"
});

Tag.belongsToMany(Recipe, {
    foreignKey: "tag_id",
    otherKey: "recipe_id",
    as: "tagRecipe",
    through: "recipe_has_tag"
});

// Recipe <-> Step

Recipe.hasMany(Step, {
    foreignKey: "recipe_id",
    as: "recipeStep"
});

Step.belongsTo(Recipe, {
    foreignKey: "recipe_id",
    as: "stepRecipe"
});

// Recipe <-> Quantity

Recipe.hasOne(Quantity);
Quantity.belongsTo(Recipe);

module.exports = { 
    Account,
    Category,
    Ingredient,
    Message,
    Quantity,
    Recipe,
    Step,
    Tag
};