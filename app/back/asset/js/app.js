const app = {
  init: function () {
    console.log('app.init');
    const addIngredientBtn = document.querySelector(".ingredient-add-btn");
    const ingredientsList = document.querySelector(".ingredients-list");
    const ingredientSelect = document.querySelector('.ingredient-select');

    console.log(ingredientSelect);
 
    const allIngredients = [];
    for (let i = 0; i < ingredientSelect.options.length; i++) {
      const optionValue = ingredientSelect.options[i].value;
      const optionText = ingredientSelect.options[i].text;
      const optionPicture = ingredientSelect.options[i].dataset.picture;
      const optionUnit = ingredientSelect.options[i].dataset.unit;
      const optionCategory = ingredientSelect.options[i].dataset.categoryId;
      allIngredients.push({id: optionValue, label: optionText, picture: optionPicture, unit: optionUnit, category_id: optionCategory});
    }
    console.log(allIngredients);

    function addIngredientToList(ingredient) {
      const div = document.createElement("div");
      const name = document.createElement("h3");
      const deleteBtn = document.createElement("button");
      const inputId = document.createElement("input");
      const inputLabel = document.createElement("input");
      const inputUnit = document.createElement("input");
    
      div.classList.add("ingredientCard");
      name.classList.add("ingredient-label");
      deleteBtn.classList.add("delete-ingredient");
    
      name.textContent = ingredient.label;
      deleteBtn.dataset.id = ingredient.id;
      deleteBtn.textContent = "Supprimer";
    
      inputId.type = "hidden";
      inputId.name = "id";
      inputId.value = ingredient.id;
    
      inputLabel.type = "hidden";
      inputLabel.name = "label";
      inputLabel.value = ingredient.label;
    
      inputUnit.type = "hidden";
      inputUnit.name = "unit";
      inputUnit.value = ingredient.unit;
    
      div.appendChild(name);
      div.appendChild(inputId);
      div.appendChild(inputLabel);
      div.appendChild(inputUnit);
      div.appendChild(deleteBtn);
    
      ingredientsList.appendChild(div);
    }
    

    function handleAddIngredient(event) {
      event.preventDefault()
      const ingredientId = ingredientSelect.value;
      const ingredient = allIngredients.find(ingredient => ingredient.id === ingredientId);

      console.log(ingredient);
      

      const ingredientsListItems = ingredientsList.querySelectorAll('.ingredient-label');
      const alreadyAdded = Array.from(ingredientsListItems).some(item => item.textContent === ingredient.label);
      console.log(alreadyAdded);

      if (!alreadyAdded && ingredient) {
        addIngredientToList(ingredient);
      }
    }
    


    

    addIngredientBtn.addEventListener("click", handleAddIngredient);
  }
};

document.addEventListener("DOMContentLoaded", app.init);
