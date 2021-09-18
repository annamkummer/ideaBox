class Idea {
  constructor(title, body, star, id) {
    this.id = id  || Date.now();
    this.title = title;
    this.body = body;
    this.star = star || false;
  }

  saveToStorage() {
  var id = this.id;
  var userInputs = JSON.stringify(this);
  localStorage.setItem(`${id}`, userInputs);
}

  deleteFromStorage() {
    // var retrieveID = localStorage.getItem('{$newIdea.id}')
    //using localStorage.removeItem();
  }

  updateIdea() {
    this.star = (!this.star);
  }
}
