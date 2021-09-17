class Idea {
  constructor(id, title, body, star) {
    this.id = id || Date.now();
    this.title = title;
    this.body = body;
    this.star = star || false;

  }

  saveToStorage() {
  var stringifiedIdea = JSON.stringify(this);
  window.localStorage.setItem(`${this.id}`, stringifiedIdea);
  }

  deleteFromStorage() {

  }

  updateIdea() {
// (should update the idea’s starred state)
    this.star = (!this.star);

  }
}
