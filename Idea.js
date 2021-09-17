class Idea {
  constructor(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
  }

  saveToStorage() {
// (should only have one job which is to save the instance to storage)
  // var newIdea = {id: Date.now(), title: titleInput.value, body: bodyInput.value};//do we need id & star here?
// console.log('newIdea Object', newIdea);
  var userInputs = JSON.stringify(this);
console.log('Stringified newIdea Object', userInputs);
  localStorage.setItem(`${this.id}`, userInputs);
  var retrievedId = localStorage.getItem(`${this.id}`);
console.log(retrievedId);
  var parsedId = JSON.parse(retrievedId);
console.log(parsedId);
}

  deleteFromStorage() {
    // var retrieveID = localStorage.getItem('{$newIdea.id}')
    //using localStorage.removeItem();
  }

  updateIdea() {
// (should update the idea’s starred state)
  //using localStorage.getItem()
    this.star = (!this.star);
  }
}
