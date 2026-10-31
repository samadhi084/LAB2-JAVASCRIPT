
const MIN_COMMENT_LENGTH = 15;

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
// Full Name Field
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

// Email Field
function validateEmail() {
  const value = emailInput.value.trim();

  if (value === "") {
    showFieldError(emailInput, "Please enter your email.");
    return false;
  }
  
  const domain = value.split("@")[1];
  const domainHasDot = domain !== undefined && domain.includes(".");

  if (!emailInput.checkValidity() || !domainHasDot) {
    showFieldError(emailInput, "Please enter a valid email like name@example.com.");
    return false;
  }

  showFieldValid(emailInput);
  return true;
}

// Topic Field
function validateTopic() {
  console.log(topicSelect.value + ":");
  if (topicSelect.value === "") {
    showFieldError(topicSelect, "Please choose a topic.");
    return false;
  }

  showFieldValid(topicSelect);
  return true;
}

// Comment field
function validateComments() {
  const value = commentsInput.value.trim();

  if (value.length < MIN_COMMENT_LENGTH) {
    showFieldError(commentsInput, "Comments must be at least 15 characters.");
    return false;
  }

  showFieldValid(commentsInput);
  return true;
}

// Website field
function validateWebsite() {
  // Optional field: empty is fine and stays neutral (not green)
  if (websiteInput.value.trim() === "") {
    clearFieldError(websiteInput);
    return true;
  }

  // checkValidity() uses the browser's rules for type="url"
  if (!websiteInput.checkValidity()) {
    showFieldError(websiteInput, "Please enter a valid URL, e.g. https://example.com.");
    return false;
  }

  showFieldValid(websiteInput);
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
  const emailOk = validateEmail();
  const topicOk = validateTopic();
  const commentsOk = validateComments();
  const websiteOk = validateWebsite();

  if (!nameOk || !emailOk || !topicOk || !commentsOk || !websiteOk) {
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
 