let FetchAdvice = fetch("https://api.adviceslip.com/advice");
let advice = document.querySelector(".advice");
let adviceNumber = document.querySelector(".number > span");

// get a random advice

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
let searchInput = document.querySelector("#input-search");
let xIcon = document.querySelector("#x-icon");
let goIcon = document.querySelector("#go-icon");

searchIcon.addEventListener("click", () => {
  searchIcon.style.display = "none";
  searchContainer.classList.add("search-active");
  searchInput.focus();
});

xIcon.addEventListener("click", () => {
  searchIcon.style.display = "block";
  searchContainer.classList.remove("search-active");
  searchInput.value = "";
});

searchInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    console.log(searchInput.value);
    searchAdvice(searchInput.value);
    setTimeout(() => {
      xIcon.click();
    }, 300);
  }
});

searchInput.addEventListener("blur", (e) => {
  setTimeout(() => {
    xIcon.click();
  }, 300);
});

goIcon.addEventListener("click", (e) => {
  searchAdvice(searchInput.value);
});

// search an advice
async function searchAdvice(request) {
  let url = fetch(`https://api.adviceslip.com/advice/search/${request}`);

  url
    .then((response) => response.json())
    .then((data) => {
      adviceNumber.innerHTML = data.slips[0].id;
      advice.innerHTML = `"${data.slips[0].advice}"`;
    })
    .catch((error) => {
      console.log(error);
    });
}
