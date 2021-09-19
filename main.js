var ideas = [];
var filteredIdeas = [];
var showAll = true;

var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveButton = document.querySelector('#save-button');
var ideaSection = document.querySelector('#ideas-section');
var showButton = document.querySelector('#show-button');
var searchInput = document.querySelector('#search-ideas-input');
var searchButton = document.querySelector('#search');

showButton.addEventListener('click', toggleShowButton);
saveButton.addEventListener('click', createNewIdea);
titleInput.addEventListener('keyup', checkInputs);
bodyInput.addEventListener('keyup', checkInputs);
ideaSection.addEventListener('click', favoriteOrDelete);
searchInput.addEventListener('keyup', displayCard);
window.addEventListener('load', displayCard);

checkInputs();

function favoriteOrDelete() {
  if (event.target.id === 'delete') {
    deleteCard(Number(event.target.closest('.idea-cards').id));
  } else if (event.target.id === 'star') {
    favoriteCard(Number(event.target.closest('.idea-cards').id));
  }
}

function checkInputs(){
  if (!titleInput.value || !bodyInput.value) {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }
}

function clearInputs() {
  titleInput.value = '';
  bodyInput.value = '';
  checkInputs()
}

function createNewIdea() {
  event.preventDefault()
  var newIdea = new Idea(titleInput.value, bodyInput.value);
  newIdea.saveToStorage()
  displayCard()
  clearInputs()
}

function displayCard() {
  pullFromStorage()
  filterCards()
  ideaSection.innerHTML = '';
  for (var i = 0; i < filteredIdeas.length; i++) {
    if (filteredIdeas[i].star) {
      ideaSection.innerHTML += `
        <article class='idea-cards' id="${filteredIdeas[i].id}">
          <header>
            <img src="assets/star-active.svg" id="star" alt="unfavorite this idea">
            <img src="assets/delete.svg" id="delete" alt="delete">
          </header>
          <div class='card-body'>
            <h3>${filteredIdeas[i].title}</h3>
            <p class='card-text'>${filteredIdeas[i].body}</p>
          </div>
          <footer><img src="assets/comment.svg" alt="comment">comment</footer>
        </article>`
    } else if (showAll) {
      ideaSection.innerHTML += `
        <article class='idea-cards' id="${filteredIdeas[i].id}">
          <header>
            <img src="assets/star.svg" id="star" alt="favorite this idea">
            <img src="assets/delete.svg" id="delete" alt="delete">
          </header>
          <div class='card-body'>
            <h3>${filteredIdeas[i].title}</h3>
            <p class='card-text'>${filteredIdeas[i].body}</p>
          </div>
          <footer><img src="assets/comment.svg" alt="comment">comment</footer>
        </article>`
    }
  }
}

function deleteCard(id) {
  pullFromStorage()
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === id) {
      ideas[i].deleteFromStorage()
    }
  }
  displayCard()
}

function favoriteCard(id) {
  pullFromStorage()
  for (var i = 0; i < ideas.length; i++) {
    if (id === ideas[i].id) {
      ideas[i].updateIdea()
      ideas[i].saveToStorage()
    }
    displayCard()
  }
}

function pullFromStorage() {
  ideas = [];
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var storedCard = JSON.parse(localStorage.getItem(key));
    var instantiatedCard = new Idea(storedCard.title, storedCard.body, storedCard.star, storedCard.id);
    ideas.push(instantiatedCard)
  }
}

function filterCards() {
  filteredIdeas = [];
  var inputLowerCase = searchInput.value.toLowerCase();
  for (var i = 0; i < ideas.length; i++) {
    var titleLowerCase = ideas[i].title;
    var bodyLowerCase = ideas[i].body;
    if (titleLowerCase.toLowerCase().includes(inputLowerCase) || bodyLowerCase.toLowerCase().includes(inputLowerCase)) {
      filteredIdeas.push(ideas[i]);
    }
  }
}

function toggleShowButton() {
  showAll = (!showAll);
  if (showAll) {
    showButton.innerText = "Show Starred Ideas"
  } else {
    showButton.innerText = "Show All Ideas"
  }
  displayCard()
}
