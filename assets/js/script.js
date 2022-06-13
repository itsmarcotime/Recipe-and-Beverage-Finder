var search = document.querySelector("search-input");
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
getRecipe("big mac");