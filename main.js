var list = []; //we may want to update this to ideas, to match the comp
var favoriteIdeas = []; //added this as we're going to need to collect these too

var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveButton = document.querySelector('#save-button');
var ideaSection = document.querySelector('#ideas-section');

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
  newIdea.saveToStorage();//this calls localStorage
  // list.push(newIdea);//pushes to array
  displayCard()
  clearInputs()
}

function displayCard() {
  ideaSection.innerHTML = '';
  //lines 56 - 61 below do bring back local storage on load, but everytime something is favorited it's duplicated
  for(var i = 0; i < localStorage.length; i++){
    var key = localStorage.key(i);
    var storedCard = JSON.parse(localStorage.getItem(key));
    var newStoredCard = new Idea(/*storedCard.id, */storedCard.title, storedCard.body, storedCard.star); //throwing the id in here jumbles the order of the card
    list.push(newStoredCard);
  }
  for(var i = 0; i < list.length; i++) {
//we can definitely refactor this to make it DRY code. It's very repetitive.
    var ideaTitle = list[i].title;
    var ideaBody = list[i].body;
    var ideaId = list[i].id;
    var starImg;
    var starAlt
    if (list[i].star) {
      starImg = 'assets/star-active.svg'
      starAlt = 'unfavorite this idea'
    } else {
      starImg = 'assets/star.svg'
      starAlt = 'favorite this idea'
    }
  ideaSection.innerHTML += `
    <article class='idea-cards' id="${ideaId}">
      <header>
        <img src="${starImg}" id="star" alt="${starAlt}">
        <img src="assets/delete.svg" id="delete" alt="delete">
      </header>
      <div class='card-body'>
        <h3>${ideaTitle}</h3>
        <p class='card-text'>${ideaBody}</p>
      </div>
      <footer><img src="assets/comment.svg" alt="comment">comment</footer>
    </article>`
  }
  console.log(ideaSection)
}

function deleteCard(id) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list.splice(i, 1);
    }
  }
  displayCard();
}

function favoriteCard(id) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list[i].star = (!list[i].star)
      list[i].saveToStorage();
    }
  }
  displayCard();
}
