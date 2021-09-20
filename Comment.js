class Comment {
  constructor(content) {
    this.content = content;
  }

  saveToStorage() {
// (should only have one job which is to save the instance to storage)
    var id = this.id;
    var userInputs = JSON.stringify(this);
    localStorage.setItem(`${id}`, userInputs);
  }

  deleteFromStorage() {

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
