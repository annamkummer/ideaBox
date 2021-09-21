class Comment {
  constructor(content) {
    this.content = content;
  }

  saveToStorage() {
    var userInput = JSON.stringify(this);
    localStorage.setItem(Date.now(), userInput);
  }

  deleteFromStorage() {
    var userInput = JSON.stringify(this);
    localStorage.removeItem(Date.now(), userInputs);
  }
}
