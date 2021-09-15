var list = [];

var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveButton = document.querySelector('#save-button');


saveButton.addEventListener('click', createNewIdea)

function createNewIdea() {
   var title = titleInput.value;
   var body = bodyInput.value;
   if (title && body) {
     var newIdea = new Idea(title, body);
     list.push(newIdea);
     displayCard()
   } else {
     console.log('add error message?');
   }

   console.log(list);
   event.preventDefault()

// May refactor to:
  // var newIdea = new Idea(titleInput.value, bodyInput.value)

  // When user clicks 'Save'
  // Take in the user's inputs (title and body)
  // Create an new Idea object in a variable
  //    var title = titleInput.value
  //    var body = bodyInput.value
  //    if title and body exist, create object instance
  // push to list array
  // call displayCard function
}

function displayCard() {
  // take inner HTML and display list objects
  // article class="idea-cards"
}
