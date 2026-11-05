
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
  // check if the character is a letter by comparing its lowercase and uppercase forms
  // Symbols, numbers, and whitespace do not have uppercase and lowercase
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

  if (!emailInput.checkValidity() || !domainHasDot) { // checkValidity() is a built-in function that checks the validity of the input based on the type and pattern attributes
    showFieldError(emailInput, "Please enter a valid email like name@example.com.");
    return false;
  }

  showFieldValid(emailInput);
  return true;
}

// Topic Field
function validateTopic() {
 
  if (topicSelect.value === "") {
    showFieldError(topicSelect, "Please choose a topic.");
    return false;
  }

  showFieldValid(topicSelect);
  return true;
}

// Comment field
const MIN_COMMENT_LENGTH = 15;
const MAX_COMMENT_LENGTH = 40;

function validateComments() {
  const value = commentsInput.value.trim();

  if (value.length < MIN_COMMENT_LENGTH || value.length > MAX_COMMENT_LENGTH) {
    showFieldError(commentsInput, "Comments must be between 15 and 40 characters.");
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

  // checkValidity() 
  if (!websiteInput.checkValidity()) { // checkValidity() is a built-in function that checks the validity of the input based on the type and pattern attributes
    showFieldError(websiteInput, "Please enter a valid URL, e.g. https://example.com.");
    return false;
  }

  showFieldValid(websiteInput);
  return true;
}

// ---------- Live charactor counter -----
function updateCounter() {
  const count = commentsInput.value.trim().length;

  if (count < MIN_COMMENT_LENGTH) {
    counter.textContent = count + " / " + MIN_COMMENT_LENGTH + " characters minimum"; //0 / 15 characters minimum
    counter.classList.add("counter-short");
    counter.classList.remove("counter-ok");
  } else {
    counter.textContent = count + " characters, minimum reached";
    counter.classList.add("counter-ok");
    counter.classList.remove("counter-short");
  }
}


// ----------- Show success message ------

const SUCCESS_DURATION = 4000; // milliseconds
let successMsgTimer; // reassigned every time a success message is shown

function showSuccess(name) {
  statusMessage.textContent = "Thanks for your feedback, " + name + "!";

  clearTimeout(successMsgTimer); // Browser inbuild functions, clearTimeout and setTimeout
  successMsgTimer = setTimeout(hideSuccess, SUCCESS_DURATION);

}

function hideSuccess() {
  statusMessage.textContent = "";
}

function resetForm() {
  form.reset();

  clearFieldError(fullNameInput);
  clearFieldError(emailInput);
  clearFieldError(topicSelect);
  clearFieldError(commentsInput);
  clearFieldError(websiteInput);
  updateCounter();

  hideSuccess();
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
    const firstInvalid = form.querySelector(".is-invalid"); // get the first invalid field
    firstInvalid.focus(); // move the focus to the first invalid field
    return;
  }
 
  const name = fullNameInput.value.trim();

  resetForm();
  showSuccess(name);
}

// ---------- Event listeners  ----------
form.addEventListener("submit", handleSubmit);
commentsInput.addEventListener("input", updateCounter);
clearButton.addEventListener("click", resetForm);

// Show "0 / 15 characters minimum" when the page loads
updateCounter();