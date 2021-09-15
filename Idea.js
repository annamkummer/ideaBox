class Idea {
  constructor(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
  }

  saveToStorage() {
// (should only have one job which is to save the instance to storage)
  }

  deleteFromStorage() {

  }

  updateIdea() {
// (should update the idea’s starred state)
  }
}
