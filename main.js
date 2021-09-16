var list = [];

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
  var title = titleInput.value;
  var body = bodyInput.value;
  if (!title || !body){
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
   var newIdea = new Idea(title, body);
   list.push(newIdea);
console.log(list);
   displayCard()
   clearInputs()
   event.preventDefault()

// May refactor to:
  // var newIdea = new Idea(titleInput.value, bodyInput.value)
}

function displayCard() {
  ideaSection.innerHTML = '';
  for(var i = 0; i < list.length; i++) {
    var ideaTitle = list[i].title;
    var ideaBody = list[i].body;
    var ideaId = list[i].id;
    var starImg;
    var starAlt
    if (list[i].star) {
      starImg = 'assets/star-active.svg'
      starAlt = 'active orange star'
    } else {
      starImg = 'assets/star.svg'
      starAlt = 'inactive white star'
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
