var list = []; //we may want to update this to ideas, to match the comp
var favoriteIdeas = []; //added this as we're going to need to collect these too

var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveButton = document.querySelector('#save-button');
var ideaSection = document.querySelector('#ideas-section');
var showButton = document.querySelector('.show-button')

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
window.addEventListener('load', displayCard());
//we need to add displayCard() function to an on page load eventListener so

function checkInputs() {
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

function displayCard() {
  pullFromStorage()
  ideaSection.innerHTML = '';
  for(var i = 0; i < list.length; i++) {
    if (list[i].star) {
      ideaSection.innerHTML += `
        <article class='idea-cards' id="${list[i].id}">
          <header>
            <img src="assets/star-active.svg" id="star" alt="unfavorite this idea">
            <img src="assets/delete.svg" id="delete" alt="delete">
          </header>
          <div class='card-body'>
            <h3>${list[i].title}</h3>
            <p class='card-text'>${list[i].body}</p>
          </div>
          <footer><img src="assets/comment.svg" alt="comment">comment</footer>
        </article>`
    } else if (showAll) {
      ideaSection.innerHTML += `
        <article class='idea-cards' id="${list[i].id}">
          <header>
            <img src="assets/star.svg" id="star" alt="favorite this idea">
            <img src="assets/delete.svg" id="delete" alt="delete">
          </header>
          <div class='card-body'>
            <h3>${list[i].title}</h3>
            <p class='card-text'>${list[i].body}</p>
          </div>
          <footer><img src="assets/comment.svg" alt="comment">comment</footer>
        </article>`
    }


    // -----
  //   var starImg;
  //   var starAlt;
  //   if (list[i].star) {
  //     starImg = 'assets/star-active.svg'
  //     starAlt = 'unfavorite this idea'
  //   } else {
  //     starImg = 'assets/star.svg'
  //     starAlt = 'favorite this idea'
  //   }
  // ideaSection.innerHTML += `
  //   <article class='idea-cards' id="${list[i].id}">
  //     <header>
  //       <img src="${starImg}" id="star" alt="${starAlt}">
  //       <img src="assets/delete.svg" id="delete" alt="delete">
  //     </header>
  //     <div class='card-body'>
  //       <h3>${list[i].title}</h3>
  //       <p class='card-text'>${list[i].body}</p>
  //     </div>
  //     <footer><img src="assets/comment.svg" alt="comment">comment</footer>
  //   </article>`
  }
}

// AKU: Edit this to call the Idea.js deleteFromStorage function:
function deleteCard(id) {
  pullFromStorage()
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      localStorage.removeItem(`${id}`)
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


/*
Pseudocode:
Goal: When "Show starred Ideas" button is pressed,
      Only favorited ideas should be displayed, and
      Button text should change to "Show All Ideas"

Input: User clicks "Show starred Ideas" buttons

Output: Display of favorited ideas, button text change

1) Listen for "Show starred ideas" button click
-- includes having a variable for this button element, and creating an event listener for a click

2) Event handler sets a variable, showAll to true or false accordingly

3) Display starred cards only
-- Add conditional to displayCard function that looks at the 'starred'/'all' variable and displays accordingly

var showAll = true/false
if (showStarsOrAll === 'stars') {

}

for (entire list array) {
  if (element is starred) {
  display it
} else if (showAll [is true])
  display
}


*/
