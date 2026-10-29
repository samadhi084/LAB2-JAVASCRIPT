
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

// ----------- utility functions ----------

function isLetter(char) {
  return char.toLowerCase() !== char.toUpperCase();
}

function isAllowedNameChar(char) {
  return isLetter(char) || char === " " || char === "'" || char === "-";
}

// ----------- Validator functions --------

function validateFullName() {
  const value = fullNameInput.value.trim();

  if (value === "") {
    showFieldError(fullNameInput, "Please enter your full name.");
    return false;
  }

  if (value.length < 2) {
    showFieldError(fullNameInput, "Name must be at least 2 characters.");
    return false;
  }

  for (const char of value) {
    if (!isAllowedNameChar(char)) {
      showFieldError(fullNameInput, "Use only letters, spaces, apostrophes and hyphens.");
      return false;
    }
  }

  showFieldValid(fullNameInput);
  return true;
}

// ----------- Show success message ------
function showSuccess(name) {
  statusMessage.textContent = "Thanks for your feedback, " + name + "!";

}

function resetForm() {
  form.reset();
}

// ----------- Submit Action --------------
function handleSubmit(event) {
  event.preventDefault(); // stop the page from reloading

  const nameOk = validateFullName();

   if (!nameOk) {
    const firstInvalid = form.querySelector(".is-invalid");
    firstInvalid.focus();
    return;
  }
 
  const name = fullNameInput.value.trim();

  resetForm();
  showSuccess(name);

}


// ---------- Event listeners  ----------
 
form.addEventListener("submit", handleSubmit);
 