class Idea {
  constructor(title, body, star, id) {
    this.id = id  || Date.now();
    this.title = title;
    this.body = body;
    this.star = star || false;
    this.comments = [];
  }

  saveToStorage() {
  var id = this.id;
  var userInputs = JSON.stringify(this);
  localStorage.setItem(`${id}`, userInputs);
}

  deleteFromStorage() {
    var id = this.id;
    var userInputs = JSON.stringify(this);
    localStorage.removeItem(`${id}`, userInputs);
  }

  updateIdea() {
    this.star = (!this.star);
  }
}
