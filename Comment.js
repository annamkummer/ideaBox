class Comment {
  constructor(content) {
    this.content = content;
  }

  saveToStorage() {
// (should only have one job which is to save the instance to storage)
    var userInput = JSON.stringify(this);
    localStorage.setItem(Date.now(), userInput);
  }

  deleteFromStorage() {
    var userInput = JSON.stringify(this);
    localStorage.removeItem(Date.now(), userInputs);
  }
}


/*
Goals:

Input:

Output:


Need a variable for the add image querySelector
Need an add image event addEventListener

Create comment form

Hide the current 'create new idea' form and unhide the new 'comment' form


Loop through the cards (ideas)
Find the one with the matching id to the event.target

-----This is where we're ending:
Push the comment content into the comments property array
Update the innerHTML to include the comment content
Run save to storage
*/
