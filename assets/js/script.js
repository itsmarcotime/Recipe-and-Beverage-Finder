var userFormEl = document.querySelector("#user-form");
var searchFormEl = document.querySelector("#search-form");
var randBtnEl = document.querySelector('#rand-btn');
var recipeContainerEl = document.querySelector("#recipe-container");
var result = document.querySelector("#recipe-result"); 
var mealIngredientEl = document.querySelector('#meal-ingredients');
var mealInstructionsEl = document.querySelector('#meal-instruct');
var drinkFormEl = document.querySelector('#drink-srch');
var drinkContainerEl = document.querySelector('#drink-container');
var drinkIngredientEl = document.querySelector('#drink-ingredients');
var drinkResult = document.querySelector('#drink-search-term');
var drinkInstructionsEl = document.querySelector('#drink-instruct');
var searchBtn = document.querySelector("#search-btn");
var mealSaveEl = document.querySelector('#meal-save');
var drinkSaveEl = document.querySelector('#drink-save');
var groceryListEl = document.querySelector('#grocery-list');



var getRecipe = function(recipe) {
    var apiUrl = ("https://www.themealdb.com/api/json/v1/1/search.php?s=" + recipe)

    // make request to api
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            displayMeal(data, recipe);
        });
    });
};

var formSubmitHandler = function(event) {
    event.preventDefault();

    // getting value from input element 
    var searchedRecipe = searchFormEl.value.trim();
    let searchedCocktail = drinkFormEl.value.trim();

    if (searchedRecipe) {
        getRecipe(searchedRecipe);
        searchFormEl.value="";
    } else if (searchedCocktail) {
        getIngredient(searchedCocktail);
        drinkFormEl.value="";
    }
};

var displayMeal = function(recipe, searchTerm) {
    // check to see if there are any recipes
    console.log(recipe);
    console.log(searchTerm);
    mealIngredientEl.textContent = "";


let myMeal = recipe.meals[0];
let instruct = myMeal.strInstructions; 
let count = 1;
let ingredients = [];
for (let i in myMeal) {
    let ingredient = "";
    let measure = "";
    if (i.startsWith("strIngredient") && myMeal[i]) {
    ingredient = myMeal[i];
    measure = myMeal["strMeasure" + count];
    count += 1;
    ingredients.push(`${measure} ${ingredient},`); 
    }
}

result.textContent = myMeal.strMeal; 
    for (let i = 0; i < ingredients.length; i++){
        let ingredientEl = document.createElement("li");
        ingredientEl.textContent = ingredients[i];
        console.log(ingredients[i]);
        mealIngredientEl.appendChild(ingredientEl);
    }

    mealInstructionsEl.textContent = instruct;

    mealSaveEl.addEventListener("click", mealStore);
    } 
//}


let cocktailRand = function() {
    var apiRand = ("https://www.thecocktaildb.com/api/json/v1/1/random.php");

    fetch(apiRand).then(function(response) { 
        response.json().then(function(data) {
            let myDrink = data.drinks[0];
            displayDrink(myDrink);
        });
    });
};

let getIngredient = function (ingred) {
    let apiUrl = ("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + ingred);

    fetch(apiUrl).then(function(response) { 
        response.json().then(function(data) {
            let myDrink = data.drinks[0];
            displayDrink(myDrink);
        });
    });
};

let displayDrink = function(drink) {
    drinkIngredientEl.textContent = "";
    console.log(drink);

    let drinkName = drink.strDrink;
    let instruct = drink.strInstructions;
    let isAlcoholic = drink.strAlcoholic;
    let count = 1;
    let ingredients = [];

    for (let i in drink) {
        let ingredient = "";
        let measure = "";
        if (i.startsWith("strIngredient") && drink[i]) {
            ingredient = drink[i];
            measure = drink["strMeasure" + count];
            count += 1;
            ingredients.push(`${measure} ${ingredient},`); 
        }
    }
    for (let i = 0; i < ingredients.length; i++){
        let ingredientEl = document.createElement("li");
        ingredientEl.textContent = ingredients[i];
        
        drinkIngredientEl.appendChild(ingredientEl);
    }

    drinkResult.textContent = drinkName;

    drinkInstructionsEl.textContent = instruct;
    
    console.log(drinkName);
    console.log(instruct);
    console.log(ingredients);
    console.log(isAlcoholic);

    drinkSaveEl.addEventListener("click", drinkStore);
}

let drinkStore = function(event) {
    event.preventDefault();


    //check local storage if clear set to an empty array
    let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];

    let drinkInfo = drinkIngredientEl.textContent;
    let ingredient = drinkInfo.split(",");
    let recipe = {name: drinkResult.textContent, list: ingredient};
    for (let i = 0; i < (ingredient.length) - 1; i++) {
        console.log(ingredient[i]);
    }
    console.log(recipe);

    shoppingList.push(recipe);
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));

    listPrint();
}

let mealStore = function(event) {
    event.preventDefault();


    //check local storage if clear set to an empty array
    let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];

    let mealInfo = mealIngredientEl.textContent;
    let ingredient = mealInfo.split(",");
    let recipe = {name: result.textContent, list: ingredient};
    for (let i = 0; i < (ingredient.length) - 1; i++) {
        console.log(ingredient[i]);
    }
    console.log(recipe);

    shoppingList.push(recipe);
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));

    listPrint();
}

let listPrint = function() {

    groceryListEl.textContent = ""

    let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];
    console.log(shoppingList);
    for (let i = 0; i < shoppingList.length; i++){
        let itemName = document.createElement("li");
        itemName.classList.add("grocery-name");
        itemName.textContent = shoppingList[i].name;
        groceryListEl.appendChild(itemName);

        //create a list element to store ingredient list
        let ingredList = document.createElement("ul");
        ingredList.id = shoppingList[i].name;
        ingredList.classList.add("ingredient-name");
        itemName.appendChild(ingredList);
           
        for (let j in shoppingList[i].list) {
            let ingredientEl = document.createElement("li");
            ingredientEl.textContent = shoppingList[i].list[j];
            ingredList.appendChild(ingredientEl);
        }
    }
}


userFormEl.addEventListener("submit", formSubmitHandler);
randBtnEl.addEventListener("click", cocktailRand);
listPrint();