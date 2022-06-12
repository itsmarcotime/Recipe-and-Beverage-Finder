var search = document.querySelector("search-input");
var searchBtn = document.querySelector("search-btn");
var result = document.querySelector("recipe-result"); 
var recipeContainerEl = document.querySelector("recipe-container");

function getRecipe() {
    var requestUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="
    fetch (requestUrl).then(function(response) {
        return response.json();
        console.log(requestUrl);  
    })
};

getRecipe();