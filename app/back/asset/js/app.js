const app = {
  init: function (req, res, ingredients) {
    console.log('app.init');
    const itemsPerPage = 10;
    let currentPage = 1;

    const renderTable = () => {
      const table = document.querySelector(".ingredient table tbody.bottom");
      table.innerHTML = "";
      const ingredientsSlice = ingredients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
      for (const ingredient of ingredientsSlice) {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${ingredient.id}</td><td><img class="picture-ingredient" src="http://localhost:3000/public/picture/ingredient/${ingredient.picture}" alt="${ingredient.picture}"></td><td><a href="/admin/ingredient/${ingredient.id}">${ingredient.label}</a></td>`;
        table.appendChild(row);
      }
    };

    const renderPagination = () => {
      const pagination = document.querySelector(".pagination");
      pagination.innerHTML = "";
      const pageCount = Math.ceil(ingredients.length / itemsPerPage);
      for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement("button");
        button.innerText = i;
        if (i === currentPage) {
          button.classList.add("active");
        }
        pagination.appendChild(button);
      }
      pagination.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
          currentPage = parseInt(event.target.innerText);
          renderTable();
          const activeButton = pagination.querySelector(".active");
          if (activeButton) {
            activeButton.classList.remove("active");
          }
          event.target.classList.add("active");
        }
      });
    };

    renderTable();
    renderPagination();
  },
};

document.addEventListener("DOMContentLoaded", (req, res) => {
  const ingredients = res.locals.ingredients ;
  app.init({ locals: JSON.stringify({ingredients: ingredients}) }, null, ingredients);
});
