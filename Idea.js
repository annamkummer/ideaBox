class Idea {
  constructor(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;

  }

  saveToStorage() {
// (should only have one job which is to save the instance to storage)
  var stringifiedIdea = JSON.stringify(this);
  localStorage.setItem(`${this.id}`, stringifiedIdea);
  // var getIdeaLocal = localStorage.getItem(`${this.id}`);
  // var makeIdeaObject = JSON.parse(getIdeaLocal);
  }

  deleteFromStorage() {

  }

  updateIdea() {
// (should update the idea’s starred state)
    this.star = (!this.star);

  }
}
