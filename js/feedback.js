
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


// ----------  Error helpers ----------

function showFieldError(input, message) {
  const errorElement = document.getElementById(input.id + "-error");

  errorElement.textContent = message;
  input.classList.add("is-invalid");
  input.classList.remove("is-valid");
}

function showFieldValid(input) {
  const errorElement = document.getElementById(input.id + "-error");

  errorElement.textContent = "";
  input.classList.add("is-valid");
  input.classList.remove("is-invalid");
}

function clearFieldError(input) {
  const errorElement = document.getElementById(input.id + "-error");

  errorElement.textContent = "";
  input.classList.remove("is-invalid", "is-valid");
}

// ----------- Submit Action --------------
function handleSubmit(event) {
  event.preventDefault(); // stop the page from reloading

 
  const name = fullNameInput.value.trim();

  console.log(name);
}


// ---------- Event listeners  ----------
 
form.addEventListener("submit", handleSubmit);
 