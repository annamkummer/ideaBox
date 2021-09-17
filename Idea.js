class Idea {
  constructor(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
  }

  saveToStorage() {
// (should only have one job which is to save the instance to storage) --> I think this means keep the innerHTML out of this
  var newIdea = {id: Date.now(), title: titleInput.value, body: bodyInput.value};//do we need id & star here?
console.log('newIdea Object', newIdea);
  var userInputs = JSON.stringify(newIdea);
console.log('Stringified newIdea Object', userInputs);
  // calling the key as the id, so that more than one idea card will log to localStorage
  localStorage.setItem('${newIdea}.id}', userInputs);
  //**Note, all of the ideas are being added to the array in the main.js createNewIdea function
}

  deleteFromStorage() {

  }

  updateIdea() {
// (should update the idea’s starred state)
  }
}
