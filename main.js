var ideas = [];
var filteredIdeas = [];
var showAll = true;
var ideaCardHtml;
var clickedCardId;

var titleInput = document.querySelector('#titleInput');
var bodyInput = document.querySelector('#bodyInput');
var searchInput = document.querySelector('#searchIdeasInput');
var commentInput = document.querySelector("#commentInput");
var saveButton = document.querySelector('#saveButton');
var searchButton = document.querySelector('#search');
var showButton = document.querySelector('#showButton');
var addCommentButton = document.querySelector("#addComment");
var ideaSection = document.querySelector('#ideasSection');
var createCardForm = document.querySelector('#cardForm');
var commentForm = document.querySelector("#commentForm");
var backToMainButton = document.querySelector("#createNew");

showButton.addEventListener('click', toggleShowButton);
saveButton.addEventListener('click', createNewIdea);
ideaSection.addEventListener('click', selectCardOption);
addCommentButton.addEventListener('click', showComment);
backToMainButton.addEventListener('click', showMainForm);
titleInput.addEventListener('keyup', checkInputs);
bodyInput.addEventListener('keyup', checkInputs);
searchInput.addEventListener('keyup', displayCards);
commentInput.addEventListener('keyup', checkCommentInput);

checkInputs();
displayCards();

function selectCardOption() {
  if (event.target.closest('.idea-cards')) {
    clickedCardId = (Number(event.target.closest('.idea-cards').id));
  }
  if (event.target.id === 'delete') {
    deleteCard(clickedCardId);
  } else if (event.target.id === 'star') {
    favoriteCard(clickedCardId);
  } else if (event.target.id === 'add') {
    showCommentForm();
    displayCards()
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
  commentInput.value = '';
  checkInputs()
  checkCommentInput()
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
  if (createCardForm.classList.contains("hidden")) {
    showCommentedCard()
  } else {
    filterCards()
  }
  ideaSection.innerHTML = '';
  for (var i = 0; i < filteredIdeas.length; i++) {
    if (filteredIdeas[i].star || showAll) {
      buildHtml(i);
      ideaSection.innerHTML += ideaCardHtml;
    }
  }
}

function filterCards() {
  filteredIdeas = [];
  var inputLowerCase = ''
  if (searchInput.value) {
    inputLowerCase = searchInput.value.toLowerCase();
  }
  for (var i = 0; i < ideas.length; i++) {
    if (ideas[i].title.toLowerCase().includes(inputLowerCase) || ideas[i].body.toLowerCase().includes(inputLowerCase)) {
      filteredIdeas.push(ideas[i]);
    }
  }
}

function showCommentedCard() {
  filteredIdeas = [];
  for (var i = 0; i < ideas.length; i++) {
    if (clickedCardId === ideas[i].id) {
      filteredIdeas.push(ideas[i]);
    }
  }
}

function buildHtml(index) {
  if (filteredIdeas[index].star) {
    var ideaStar = 'img class="active-star" src="assets/star-active.svg" id="star" alt="unfavorite this idea"';
  } else {
    var ideaStar = 'img class="star" src="assets/star.svg" id="star" alt="favorite this idea"';
  }
  var ideaComments = '';
  if (filteredIdeas[index].comments.length) {
    ideaComments = `<h4>Comments: </h4>`
    for (var i = 0; i < filteredIdeas[index].comments.length; i++) {
      ideaComments += `<p class="comment-text">${filteredIdeas[index].comments[i].content}</p>`
    }
  }
  buildCardHtml(filteredIdeas[index].id, ideaStar, filteredIdeas[index].title, filteredIdeas[index].body, ideaComments)
}

function buildCardHtml(id, star, title, body, comments) {
  ideaCardHtml =
  `<article class='idea-cards' id="${id}">
    <header>
      <${star}>
      <img src="assets/delete.svg" id="delete" alt="delete">
    </header>
    <div class='card-body'>
      <h3>${title}</h3>
      <p class='card-text'>${body}</p>
      ${comments}
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
    var instantiatedCard = new Idea(storedCard.title, storedCard.body, storedCard.star, storedCard.id, storedCard.comments);
    ideas.push(instantiatedCard)
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

function showCommentForm() {
  createCardForm.classList.add("hidden");
  commentForm.classList.remove("hidden");
  checkCommentInput()
}

function showMainForm(){
  createCardForm.classList.remove("hidden");
  commentForm.classList.add("hidden");
  checkInputs()
}

function checkCommentInput() {
  if (!commentInput.value) {
    addCommentButton.disabled = true;
  } else {
    addCommentButton.disabled = false;
  }
}

function showComment() {
  event.preventDefault()
  var comment = new Comment(commentInput.value);
  for (var i = 0; i < ideas.length; i++) {
    if (clickedCardId === ideas[i].id) {
      ideas[i].comments.push(comment);
      ideas[i].saveToStorage();
    }
  }
  clearInputs()
  displayCards()
}
