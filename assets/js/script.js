var input = document.querySelector("search-input");
var searchBtn = document.querySelector("search-btn");
var recipeResult = document.querySelector("recipe-result");

var url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + input;

var getApi = function() {
    fetch (url).then ((response) => {
        if (response.ok) {
            return response.json();
        } else {
            alert("Please enter a valid food type.");
        }
    })
    .then(data => {
        console.log(data);
    })
}
