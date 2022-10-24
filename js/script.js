let FetchAdvice = fetch("https://api.adviceslip.com/advice");
let advice = document.querySelector(".advice");
let adviceNumber = document.querySelector(".number > span");

function getAdvice() {
  FetchAdvice.then((response) => {
    return response.json();
  }).then((data) => {
    adviceNumber.innerHTML = data.slip.id;
    advice.innerHTML = `"${data.slip.advice}"`;
  });
}

getAdvice();

let searchIcon = document.querySelector("#search-icon");
let searchContainer = document.querySelector(".search-container");
let xIcon = document.querySelector("#x-icon");
let goIcon = document.querySelector("#go-icon");

searchIcon.addEventListener("click", () => {
  searchIcon.style.display = "none";
  searchContainer.classList.add("search-active");
});

xIcon.addEventListener("click", () => {
  searchIcon.style.display = "block";
  searchContainer.classList.remove("search-active");
});
