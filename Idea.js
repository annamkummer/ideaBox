class Idea {
  constructor(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
  }

  saveToStorage() {
// (should only have one job which is to save the instance to storage)
  var newIdea = {id: Date.now(), title: titleInput.value, body: bodyInput.value};//do we need id & star here?
console.log('newIdea Object', newIdea);
  var userInputs = JSON.stringify(newIdea);
console.log('Stringified newIdea Object', userInputs);
  // var ideaID = this.id; --> we need to call the id somewhere, just not sure where yet.
  localStorage.setItem('localIdea', userInputs);
    //localStorage is only calling 1 item at a time
      //we need to figure out how to use the ID in this .setItem to add all unique ideas to localStorage
    //**Note, all of the ideas are being added to the array
}

  deleteFromStorage() {

  }

  updateIdea() {
// (should update the idea’s starred state)
  }
}
