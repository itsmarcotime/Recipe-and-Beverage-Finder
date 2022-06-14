var userFormEl = document.querySelector("#user-form");
var searchFormEl = document.querySelector("#search-form");

var searchBtn = document.querySelector("search-btn");
var result = document.querySelector("recipe-result"); 
var recipeContainerEl = document.querySelector("recipe-container");

var getRecipe = function(recipe) {
    var apiUrl = ("https://www.themealdb.com/api/json/v1/1/search.php?s=" + recipe)

    // make request to api
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

var formSubmitHandler = function(event) {
    event.preventDefault();

    // getting value from input element 
    var searchedRecipe = searchFormEl.value.trim();

    if (searchedRecipe) {
        getRecipe(searchedRecipe);
        searchFormEl.value="";
    } else {
        alert("Please enter a correct recipe search.")
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);