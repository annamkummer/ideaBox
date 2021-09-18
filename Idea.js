class Idea {
  constructor(title, body, star) { //IMPORTANT NOTE: Adding id to our params changes the order in which these display on the card causing an undefined
    this.id = Date.now() || id; //when these two are switched the console throws an error. Not sure why we need the "or", can we talk about this?
    this.title = title;
    this.body = body;
    this.star = star || false;
  }

  saveToStorage() {
// (should only have one job which is to save the instance to storage)
  // var newIdea = {id: Date.now(), title: titleInput.value, body: bodyInput.value};//do we need id & star here?
// console.log('newIdea Object', newIdea);
  var userInputs = JSON.stringify(this);
console.log('Stringified newIdea Object', userInputs);
  localStorage.setItem(`${this.id}`, userInputs);

/* We'll need the code below to parse, but not in this function) */
  //   var retrievedId = localStorage.getItem(`${this.id}`);
  // console.log(retrievedId);
  //   var parsedId = JSON.parse(retrievedId);
  // console.log(parsedId);
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
