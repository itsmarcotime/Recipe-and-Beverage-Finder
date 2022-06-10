var input = document.querySelector("search-input");
var searchBtn = document.querySelector("search-btn");
var recipeResult = document.querySelector("recipe-resyult");

var url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + input;

function getApit() {
fetch(url)
.then((response) => response.json())
.then((data) => {
    console.log(data);
});
};
searchButton.addEventListener("click", fetch(url));
