var ideas = [];
var filteredIdeas = [];
var showAll = true;
var ideaCardHtml;

var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveButton = document.querySelector('#save-button');
var ideaSection = document.querySelector('#ideas-section');
var showButton = document.querySelector('#show-button');
var searchInput = document.querySelector('#search-ideas-input');
var searchButton = document.querySelector('#search');
var createCardForm = document.querySelector('#card-form');
var commentForm = document.querySelector("#comment-form");
var addCommentButton = document.querySelector("#add-comment");
var commentInput = document.querySelector("#comment-input");

showButton.addEventListener('click', toggleShowButton);
saveButton.addEventListener('click', createNewIdea);
titleInput.addEventListener('keyup', checkInputs);
bodyInput.addEventListener('keyup', checkInputs);
ideaSection.addEventListener('click', selectCardOption);
searchInput.addEventListener('keyup', displayCards);
addCommentButton.addEventListener('click', showComment);

checkInputs();
displayCards();

function showComment(id) {
  event.preventDefault()
  var comment = new Comment(commentInput.value);
  // comment.saveToStorage()
  clearInputs()
  for (var i = 0; i < ideas.length; i++) {
    if (id === ideas[i].id) {
      ideas[i].comments.push(comment.content);
      console.log('new comment: ', comment.content)
      ideas[i].saveToStorage();
    }
  }
}


function selectCardOption() {
  if (event.target.id === 'delete') {
    deleteCard(Number(event.target.closest('.idea-cards').id));
  } else if (event.target.id === 'star') {
    favoriteCard(Number(event.target.closest('.idea-cards').id));
  } else if (event.target.id === 'add') {
    swapForms();
    showComment(Number(event.target.closest('.idea-cards').id));
  }
}

function swapForms() {
  createCardForm.classList.toggle("hidden");
  commentForm.classList.toggle("hidden");
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
  commentInput.value = '';
  checkInputs()
}

function createNewIdea() {
  event.preventDefault()
  var newIdea = new Idea(titleInput.value, bodyInput.value);
  newIdea.saveToStorage()
  displayCards()
  clearInputs()
}

function displayCards() {
  pullFromStorage()
  filterCards()
  ideaSection.innerHTML = '';
  for (var i = 0; i < filteredIdeas.length; i++) {
    if (filteredIdeas[i].star || showAll) {
      buildHtml(i);
      ideaSection.innerHTML += ideaCardHtml;
    }
  }
}

function buildHtml(index) {
  if (filteredIdeas[index].star) {
    var star = 'img class="active-star" src="assets/star-active.svg" id="star" alt="unfavorite this idea"';
  } else {
    var star = 'img class="star" src="assets/star.svg" id="star" alt="favorite this idea"';
  }
  ideaCardHtml =
  `<article class='idea-cards' id="${filteredIdeas[index].id}">
    <header>
      <${star}>
      <img src="assets/delete.svg" id="delete" alt="delete">
    </header>
    <div class='card-body'>
      <h3>${filteredIdeas[index].title}</h3>
      <p class='card-text'>${filteredIdeas[index].body}</p>
    </div>
    <footer><img src="assets/comment.svg" id="add" alt="add-comment">comment</footer>
  </article>`
}

function deleteCard(id) {
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].id === id) {
      ideas[i].deleteFromStorage()
    }
  }
  displayCards()
}

function favoriteCard(id) {
  for (var i = 0; i < ideas.length; i++) {
    if (id === ideas[i].id) {
      ideas[i].updateIdea()
      ideas[i].saveToStorage()
    }
    displayCards()
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
    if (ideas[i].title.toLowerCase().includes(inputLowerCase) || ideas[i].body.toLowerCase().includes(inputLowerCase)) {
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
  displayCards()
}
