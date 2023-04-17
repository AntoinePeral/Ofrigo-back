function logRecipe (recipe){
    let i = 1;

    console.log('Recette : ' + recipe.label + '\n' + 'Image : ' + recipe.picture + '\n' + 'Note : ' + recipe.rate + '\n' + 'Difficulté : ' + recipe.difficulty + '\n' + 'Temps de preparation : ' + recipe.time + '\n');
    for (const ingredient of recipe.ingredient){
        console.log('INGREDIENT '+ i + ' : ' + '\n' + 'Nom : ' + ingredient.label + '\n' + 'Categorie : ' + ingredient.category_label + '\n' + 'Quantité : ' + ingredient.quantity + '\n');
        i++;
    }
    for (const step of recipe.step){
        console.log('ETAPE ' + step.number + ' : ' + step.content + '\n');
    }
    i=1;
    for (const tag of recipe.tag){
        console.log('TAG ' + i + ' : ' +  tag.label);
        i++;
    }
};

module.exports = logRecipe;