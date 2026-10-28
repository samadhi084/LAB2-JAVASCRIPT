
// ---------- Element references ---------
const form = document.getElementById("feedback-form");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const topicSelect = document.getElementById("topic");
const commentsInput = document.getElementById("comments");
const websiteInput = document.getElementById("website");
const counter = document.getElementById("comments-counter");
const statusMessage = document.getElementById("form-status");
const clearButton = document.getElementById("clear-btn");

 

function handleSubmit(event) {
  event.preventDefault(); // stop the page from reloading

 
  const name = fullNameInput.value.trim();

  console.log(name);
}


// ---------- Event listeners  ----------
 
form.addEventListener("submit", handleSubmit);
 