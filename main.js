var list = []; //we may want to update this to ideas, to match the comp
var favoriteIdeas = []; //added this as we're going to need to collect these too

var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveButton = document.querySelector('#save-button');
var ideaSection = document.querySelector('#ideas-section');
var showButton = document.querySelector('#show-button');
var searchInput = document.querySelector('#search-ideas-input');

showButton.addEventListener('click', toggleShowButton)
var showAll = true;

function toggleShowButton() {
  showAll = (!showAll);
  if (showAll) {
    showButton.innerText = "Show Starred Ideas"
  } else {
    showButton.innerText = "Show All Ideas"
  }
  displayCard();
}

saveButton.addEventListener('click', createNewIdea);
titleInput.addEventListener('keyup', checkInputs);
bodyInput.addEventListener('keyup', checkInputs);
ideaSection.addEventListener('click', function(event) {
  if (event.target.id === 'delete') {
    deleteCard(Number(event.target.parentNode.parentNode.id)); //we need to refactor this to not call parentNode twice
  }
});
ideaSection.addEventListener('click', function(event) {
  if (event.target.id === 'star') {
    favoriteCard(Number(event.target.parentNode.parentNode.id)); //refactor
  }
});
searchInput.addEventListener('keyup', displayCard)
window.addEventListener('load', displayCard());
//we need to add displayCard() function to an on page load eventListener so

function checkInputs(){
  if (!titleInput.value || !bodyInput.value) {
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }
}

checkInputs();

function clearInputs() {
  titleInput.value = '';
  bodyInput.value = '';
  checkInputs()
}

function createNewIdea() {
  event.preventDefault()
  var title = titleInput.value;
  var body = bodyInput.value;
  var newIdea = new Idea(title, body);
// May refactor to:
  // var newIdea = new Idea(titleInput.value, bodyInput.value)
  newIdea.saveToStorage();
  displayCard()
  clearInputs()
}
var filteredList = [];
function displayCard() {
  pullFromStorage();
  filterCards();
  ideaSection.innerHTML = '';
  for(var i = 0; i < filteredList.length; i++) {
    if (filteredList[i].star) {
      ideaSection.innerHTML += `
        <article class='idea-cards' id="${filteredList[i].id}">
          <header>
            <img src="assets/star-active.svg" id="star" alt="unfavorite this idea">
            <img src="assets/delete.svg" id="delete" alt="delete">
          </header>
          <div class='card-body'>
            <h3>${filteredList[i].title}</h3>
            <p class='card-text'>${filteredList[i].body}</p>
          </div>
          <footer><img src="assets/comment.svg" alt="comment">comment</footer>
        </article>`
    } else if (showAll) {
      ideaSection.innerHTML += `
        <article class='idea-cards' id="${filteredList[i].id}">
          <header>
            <img src="assets/star.svg" id="star" alt="favorite this idea">
            <img src="assets/delete.svg" id="delete" alt="delete">
          </header>
          <div class='card-body'>
            <h3>${filteredList[i].title}</h3>
            <p class='card-text'>${filteredList[i].body}</p>
          </div>
          <footer><img src="assets/comment.svg" alt="comment">comment</footer>
        </article>`
    }
  }
}

// AKU: Edited this to call the Idea.js deleteFromStorage function:
function deleteCard(id) {
  pullFromStorage()
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list[i].deleteFromStorage();
    }
  }
  displayCard();
}

function favoriteCard(id) {
  pullFromStorage()
  for (var i = 0; i < list.length; i++) {
    if (id === list[i].id) {
      list[i].updateIdea();
      list[i].saveToStorage();
    }
    displayCard();
  }
}

function pullFromStorage() {
  list = [];
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var storedCard = JSON.parse(localStorage.getItem(key));
    var instantiatedCard = new Idea(storedCard.title, storedCard.body, storedCard.star, storedCard.id);
    list.push(instantiatedCard)
  }
}

function filterCards(){
  filteredList = [];
  var inputLowerCase = searchInput.value.toLowerCase();
  for (var i = 0; i < list.length; i++){
    var titleLowerCase = list[i].title;
    var bodyLowerCase = list[i].body;
    if (titleLowerCase.toLowerCase().includes(inputLowerCase) || bodyLowerCase.toLowerCase().includes(inputLowerCase)) {
      filteredList.push(list[i]);
    }
  }
}
