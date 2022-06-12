let recipeResult = document.querySelector("recipe-result");
let searchBtn = document.querySelector("search-btn");
let apiUrl = "https:////www.themealdb.com/api/json/v1/1/search.php?s=";

searchBtn.addEventListener("click", () => {
    let userInp = document.querySelector("search-input").ariaValueMax;

    // incase user searches invalid recipe or null
    if (userInp.length === 0) {
        result.innerHTML = "<h3>Please Enter a valid recipe search.</h3>";
    } else {
        fetch(apiUrl + userInp).then ((response) => response.json())
        .then((data) => {
            let myMeal = data.meal[0];
            console.log(myMeal);
            console.log(myMeal.strMealThumb);
            console.log(myMeal.strMeal);
            console.log(myMeal.strArea);
            console.log(myMeal.strInstructions);
            let count = 1;
            let ingredients = [];

            for (let i in myMeal) {
                let ingredient = "";
                let measure = "";
                if (i.startsWith("strIngredient") && myMeal[i]) {
                    ingredient = myMeal[i];
                    measure = myMeal["strMeasur" + count];
                    count += 1;
                    ingredients.push(`${measure} ${ingredient}`);
                }
            }
            console.log(ingredients);

            result.innerHtml = `
            <img src=${myMeal.strMealThumb}>
            <div class="details">
                <h2>${myMeal.strMeal}</h2>
                <h4>${myMeal.strArea}</h4>
            </div>
            <div id="ingredient-con"></div>
            <div id="recipe">
                <button id="hide-recipe">X</button>
                <pre id="instructions">${myMeal.strInstructions}</pre>
            </div>
            <button id="show-recipe">View Recipe</button>
            `;

            let ingredientCon = document.getElementById("ingredient-con");
            let parent = document.createElement("ul");
            let recipe = document.getElementById("recipe");
            let hideRecipe = document.getElementById("hide-recipe");
            let showRecipe = document.getElementById("show-recipe");
            ingredients.forEach((i) => {
                let child = document.createElement("li");
                child.innerText = i;
                parent.appendChild(child);
                ingredientCon.appendChild(parent);
            });
            hideRecipe.addEventListener("click", () => {
                recipe.style.display = "none";
            });
            showRecipe.addEventListener("click", () => {
                recipe.style.display = "block";
            });
    })
    .catch(() => {
        result.innerHTML = `<h3>Invalid Input</h3>`;
    });
    }
})