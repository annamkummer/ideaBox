var list = [];
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
    deleteCard(Number(event.target.parentNode.parentNode.id));
  }
});
ideaSection.addEventListener('click', function(event) {
  if (event.target.id === 'star') {
    favoriteCard(Number(event.target.parentNode.parentNode.id));
  }
});

function checkInputs(){
  // var title = titleInput.value;
  // var body = bodyInput.value;
  if (!titleInput.value || !bodyInput.value){
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
  var title = titleInput.value;
  var body = bodyInput.value;
// May refactor to:
  // var newIdea = new Idea(titleInput.value, bodyInput.value)
  var newIdea = new Idea(title, body);
//calling localStorage here, vs .push below. Moved .push to saveToStorage method in class Idea
  newIdea.saveToStorage();
  localStorage.setItem('${idea.id}', JSON.stringify(newIdea));
  // list.push(newIdea);
  displayCard()
  clearInputs()
  event.preventDefault()


}

function displayCard() {
  ideaSection.innerHTML = '';
  for(var i = 0; i < list.length; i++) {
//we can definitely refactor by taking out a bunch of these vars
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
    }
  }
  displayCard();
}
