class Idea {
  constructor(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
  }

  saveToStorage() {
// (should only have one job which is to save the instance to storage)
  var newIdea = {title: titleInput.value, body: bodyInput.value};//do we need id & star here?
console.log('newIdea Object', newIdea);
  var userInputs = JSON.stringify(newIdea);
console.log('Stringified newIdea Object', userInputs);
  var ideaID = this.id;
  localStorage.setItem('ideaID', userInputs);
  }

  deleteFromStorage() {

  }

  updateIdea() {
// (should update the idea’s starred state)
  }
}
