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

let search = document.querySelector(".search");
let searchIcon = document.querySelector("#search-icon");
let searchContainer = document.querySelector(".search-container");
let searchInput = document.querySelector("#input-search");
let xIcon = document.querySelector("#x-icon");
let goIcon = document.querySelector("#go-icon");

searchIcon.addEventListener("click", () => {
  search.classList.add("search-active");
  searchContainer.style.display = "flex";
  searchIcon.style.display = "none";
  searchInput.focus();
});

xIcon.addEventListener("click", () => {
  search.classList.remove("search-active");
  setTimeout(() => {
    searchIcon.style.display = "block";
  }, 350);
  searchContainer.style.display = "none";
  searchInput.value = "";
});

searchInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
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
