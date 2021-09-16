var list = [];

var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveButton = document.querySelector('#save-button');
var ideaSection = document.querySelector('#ideas-section');

saveButton.addEventListener('click', createNewIdea);
titleInput.addEventListener('keyup', checkInputs);
bodyInput.addEventListener('keyup', checkInputs);

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
   displayCard()
   clearInputs()
   event.preventDefault()

// May refactor to:
  // var newIdea = new Idea(titleInput.value, bodyInput.value)
}

function displayCard() {
  ideaSection.innerHTML = '';
  for(var i = 0; i < list.length; i++){
    var ideaTitle = list[i].title;
    var ideaBody = list[i].body;
    var ideaId = list[i].id;
  ideaSection.innerHTML += `
    <article class='idea-cards' id="${ideaId}">
      <header>
        <img src="assets/star-active.svg" alt="active star">
        <img src="assets/delete.svg" alt="delete">
      </header>
      <div class='card-body'>
        <h3>${ideaTitle}</h3>
        <p class='card-text'>${ideaBody}</p>
      </div>
      <footer><img src="assets/comment.svg" alt="comment">comment</footer>
    </article>`
  }
}
