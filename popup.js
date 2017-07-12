$(document).ready(function() {
    $('select').material_select();
    Materialize.showStaggeredList('#show-list');
});

const showList = [
  "https://lottery.broadwaydirect.com/show/aladdin/",
  "https://lottery.broadwaydirect.com/show/cats/",
  "https://lottery.broadwaydirect.com/show/hamilton/",
  "https://lottery.broadwaydirect.com/show/on-your-feet/",
  "https://lottery.broadwaydirect.com/show/the-lion-king/",
  "https://lottery.broadwaydirect.com/show/waitress/",
  "https://lottery.broadwaydirect.com/show/war-paint/",
  "https://lottery.broadwaydirect.com/show/wicked/"
];

// shows page buttons
const editProfileButton = document.getElementById("edit-profile");
const openSelectedButton = document.getElementById("open-selected-button");

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
  newMessage.style.color = "#F44336";
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
    results.add(monthValidation());
    results.add(dayValidation());
    results.add(yearValidation());
    results.add(zipValidation());
    results.add(countryValidation());
    return !results.has(false);
};

const firstNameValidation = () => {
  if (formElements.firstName.value === ""){
      showError('Please enter first name');
      formElements.firstName.style.borderColor = "#F44336";
      return false;
  } else {
      formElements.firstName.style.borderColor = "#4CAF50";
  }
  if (!/^[a-zA-Z ]{2,30}$/.test(formElements.firstName.value)) {
      showError("Enter a valid first name");
      formElements.firstName.style.borderColor = "#F44336";
      return false;
  } else {
      formElements.firstName.style.borderColor = "#4CAF50";
  }
};

const lastNameValidation = () => {
  if (formElements.lastName.value === ""){
      showError('Please enter last name');
      formElements.lastName.style.borderColor = "#F44336";
      return false;
  } else {
      formElements.lastName.style.borderColor = "#4CAF50";
  }
  if (!/^[a-zA-Z ]{2,30}$/.test(formElements.lastName.value)) {
      showError("Enter a valid last name");
      formElements.lastName.style.borderColor = "#F44336";
      return false;
  } else {
      formElements.lastName.style.borderColor = "#4CAF50";
  }
};

const emailValidation = () => {
  if (formElements.email.value === ""){
    showError("Please enter email");
    formElements.email.style.borderColor = "#F44336";
    formElements.email.style.boxShadow = "0 1px 0 0 #F44336";
    return false;
  } else {
    formElements.email.style.borderColor = "#4CAF50";
  }
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(formElements.email.value)){
    showError("Enter valid email address");
    formElements.email.validity.patternMismatch = true;
    formElements.email.style.borderColor = "#F44336";
    return false;
  } else {
    formElements.email.style.borderColor = "#4CAF50";
  }
};

const ticketValidation = () => {
  if (formElements.ticketQty.selectedIndex < 1){
    showError('Please choose ticket amount');
    formElements.ticketQty.style.borderColor = "#F44336";
    return false;
  } else {
    formElements.ticketQty.style.borderColor = "#4CAF50";
  }
};

const monthValidation = () => {
  if (isNaN(formElements.month.value) || !inRange(Number(formElements.month.value), 1, 12)){
    showError("Enter a valid DOB month");
    formElements.month.style.borderColor = "#F44336";
    return false;
  } else {
    formElements.month.style.borderColor = "#4CAF50";
  }
};
const dayValidation = () => {
  if (isNaN(formElements.day.value) || !inRange(Number(formElements.day.value), 1, 31)){
    showError("Enter a valid DOB day");
    formElements.day.style.borderColor = "#F44336";
    return false;
  } else {
    formElements.day.style.borderColor = "#4CAF50";
  }
};
const yearValidation = () => {
  if (isNaN(formElements.year.value) || !inRange(Number(formElements.year.value), 1850, 2010)){
    showError("Enter a valid DOB year");
    formElements.year.style.borderColor = "#F44336";
    return false;
  } else {
    formElements.year.style.borderColor = "#4CAF50";
  }
};

const zipValidation = () => {
  if (formElements.zip.value.length !== 5){
    showError("Enter a valid zip code");
    formElements.zip.style.borderColor = "#F44336";
    return false;
  } else {
    formElements.zip.style.borderColor = "#4CAF50";
  }
};

const countryValidation = () => {
  formElements.country.style.borderColor = "#4CAF50";
};

const inRange = (number, low, high) => {
  return (number >= low && number <= high);
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
      formElements.country.selectedIndex = storage.profile.country;

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
  for (let key in formElements) {
    formElements[key].style.borderColor = "";
    formElements[key].value = "";
  }
  $('label').removeClass('active');
  Materialize.showStaggeredList('#show-list');
};

editProfileButton.onclick = () => {
  loadProfile();
  document.getElementById("profile-container").style.visibility = "visible";
  document.getElementById("shows-container").style.marginLeft = "-440px";
  $('label').addClass('active');
};

openSelectedButton.onclick = () => {
  const selectedShows = [];
  const checkBoxes = document.getElementsByClassName("show-checkbox");
  for (let i = 0; i < checkBoxes.length; i++){
    if (checkBoxes[i].checked) selectedShows.push(Number(checkBoxes[i].value));
  }

  selectedShows.forEach( i => {
    chrome.tabs.create({
      url: showList[i],
      active: false
    }, tab => {
      // setTimeout(() => chrome.tabs.remove(tab.id), 1000);
      chrome.tabs.executeScript(tab.id, {file: "script.js"}, response => {
        console.log(response);
      });
    });
  });
};
