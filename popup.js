debugger
// shows dom

// shows button
const editProfileButton = document.getElementById("edit-profile");

// form dom
const formElements = {
  "firstName" : document.getElementById("fNameInput"),
  "lastName" : document.getElementById("lNameInput"),
  "ticketQty" : document.getElementById("ticketQuantityInput"),
  "email" : document.getElementById("emailInput"),
  "month" : document.getElementById("monthInput"),
  "day" : document.getElementById("dayInput"),
  "year" : document.getElementById("yearInput"),
  "zip" : document.getElementById("zipInput"),
  "country" : document.getElementById("countryInput")
};

// form buttons
const backButton = document.getElementById("back-button");
const saveButton = document.getElementById("save-button");

// form errors
const notification = document.getElementById("notification");

const notify = message => {
  notification.innerHTML = message;
  notification.style.opacity = "1";
  setTimeout( () => {
      notification.style.opacity = "0";
  }, 1000);
};

const showError = error => {
  const errorMessage = document.getElementById("error-messages");
  const newMessage = document.createElement("div");
  newMessage.style.color = "red";
  newMessage.innerHTML = error;
  errorMessage.appendChild(newMessage);
};

const clearError = () => {
  document.getElementById("error-messages").innerHTML = "";
};

const formValidation = () => {
    const results = new Set();
    results.add(firstNameValidation());
    results.add(lastNameValidation());
    results.add(emailValidation());
    results.add(ticketValidation());
    results.add(DOBValidation());
    results.add(zipValidation());
    results.add(countryValidation());
    return !results.has(false);
};

const firstNameValidation = () => {
  if (formElements.firstName.value === ""){
      showError('Please enter first name');
      formElements.firstName.style.borderColor = "red";
      return false;
  } else {
      formElements.firstName.style.borderColor = "green";
  }
  if (!/^[A-Za-z ]+$/.test(formElements.firstName.value)) {
      showError("Enter a valid first name");
      formElements.firstName.style.borderColor = "red";
      return false;
  } else {
      formElements.firstName.style.borderColor = "green";
  }
  if (formElements.firstName.value.length <= 2){
      showError('Your name is too Short');
      formElements.firstName.style.borderColor = "red";
      return false;
  } else {
      formElements.firstName.style.borderColor = "green";
  }
};

const lastNameValidation = () => {
  if (formElements.lastName.value === ""){
      showError('Please enter last name');
      formElements.lastName.style.borderColor = "red";
      return false;
  } else {
      formElements.lastName.style.borderColor = "green";
  }
  if (!/^[A-Za-z ]+$/.test(formElements.lastName.value)) {
      showError("Enter a valid last name");
      formElements.lastName.style.borderColor = "red";
      return false;
  } else {
      formElements.lastName.style.borderColor = "green";
  }
  if (formElements.lastName.value.length <= 2){
      showError('Your last name is too short');
      lastName.style.borderColor = "red";
      return false;
  } else {
      formElements.lastName.style.borderColor = "green";
  }
};

const emailValidation = () => {
  if (formElements.email.value === ""){
    showError("Please enter email");
    formElements.email.style.borderColor = "red";
    return false;
  } else {
    formElements.email.style.borderColor = "green";
  }
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(formElements.email.value)){
    showError("Enter valid email address");
    formElements.email.style.borderColor = "red";
    return false;
  } else {
    formElements.email.style.borderColor = "green";
  }
};

const ticketValidation = () => {
  if (formElements.ticketQty.selectedIndex < 1){
    showError('Please choose ticket amount');
    formElements.ticketQty.style.borderColor = "red";
    return false;
  } else {
    formElements.ticketQty.style.borderColor = "green";
  }
};

const monthValidation = () => {
  if (Number(formElements.month.value) < 1 || Number(formElements.month.value) > 12){
    showError("Enter a valid DOB month");
    formElements.month.style.borderColor = "red";
    return false;
  } else {
    formElements.month.style.borderColor = "green";
  }
};
const dayValidation = () => {
  if (Number(formElements.day.value) < 1 || Number(formElements.day.value) > 31){
    showError("Enter a valid DOB day");
    formElements.day.style.borderColor = "red";
    return false;
  } else {
    formElements.day.style.borderColor = "green";
  }
};
const yearValidation = () => {
  if (Number(formElements.year.value) < 1880 || Number(formElements.year.value) > 2010){
    showError("Enter a valid DOB year");
    formElements.year.style.borderColor = "red";
    return false;
  } else {
    formElements.year.style.borderColor = "green";
  }
};

const DOBValidation = () => {
  monthValidation();
  dayValidation();
  yearValidation();
};

const zipValidation = () => {
  if (formElements.zip.value.length !== 5){
    showError("Enter a valid zip code");
    formElements.zip.style.borderColor = "red";
    return false;
  } else {
    formElements.zip.style.borderColor = "green";
  }
};

const countryValidation = () => {
  formElements.country.style.borderColor = "green";
};

const loadProfile = () => {
  chrome.storage.sync.get("profile", storage => {
    if (storage.profile){
      formElements.firstName.value = storage.profile.fname;
      formElements.lastName.value = storage.profile.lname;
      formElements.ticketQty.selectedIndex = storage.profile.ticketQty;
      formElements.email.value = storage.profile.email;
      formElements.month.value = storage.profile.month;
      formElements.day.value = storage.profile.day;
      formElements.year.value = storage.profile.year;
      formElements.zip.value = storage.profile.zip;
      formElements.country.selectedIndex = storage.profile.selectedIndex;

      notify("Profile Loaded");
    }
  });
};

const saveProfile = () => {
  const profile = {
    "fname": formElements.firstName.value,
    "lname": formElements.lastName.value,
    "ticketQty": formElements.ticketQty.selectedIndex,
    "email": formElements.email.value,
    "month": formElements.month.value,
    "day": formElements.day.value,
    "year": formElements.year.value,
    "zip": formElements.zip.value,
    "country": formElements.country.selectedIndex
  };

  return profile;
};

saveButton.onclick = () => {
  clearError();
  if (formValidation()){
    chrome.storage.sync.set({ "profile" : saveProfile() }, () => {
      notify("Saved");
    });
  }
};

backButton.onclick = () => {
  document.getElementById("profile-container").style.visibility = "hidden";
  document.getElementById("shows-container").style.marginLeft = "0px";
  clearError();
  for (let key in formElements) formElements[key].style.borderColor = "";
};

editProfileButton.onclick = () => {
  loadProfile();
  document.getElementById("profile-container").style.visibility = "visible";
  document.getElementById("shows-container").style.marginLeft = "-440px";
};
