const firstName = document.getElementById("fNameInput");
const lastName = document.getElementById("lNameInput");
const ticketQty = document.getElementById("ticketQuantityInput");
const email = document.getElementById("emailInput");
const month = document.getElementById("monthInput");
const day = document.getElementById("dayInput");
const year = document.getElementById("yearInput");
const zip = document.getElementById("zipInput");
const country = document.getElementById("countryInput");

const backButton = document.getElementById("back-button");
const saveButton = document.getElementById("save-button");

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
    firstNameValidation();
    lastNameValidation();
    emailValidation();
    ticketValidation();
    DOBValidation();
    zipValidation();
    countryValidation();
    return true;
};

const firstNameValidation = () => {
  if (firstName.value === ""){
      showError('Please enter first name');
      firstName.style.borderColor = "red";
      return false;
  } else {
      firstName.style.borderColor = "green";
  }
  if (!/^[A-Za-z ]+$/.test(firstName.value)) {
      showError("Enter a valid first name");
      firstName.style.borderColor = "red";
      return false;
  } else {
      firstName.style.borderColor = "green";
  }
  if (firstName.value.length <= 2){
      showError('Your name is too Short');
      firstName.style.borderColor = "red";
      return false;
  } else {
      firstName.style.borderColor = "green";
  }
};

const lastNameValidation = () => {
  if (lastName.value === ""){
      showError('Please enter last name');
      lastName.style.borderColor = "red";
      return false;
  } else {
      lastName.style.borderColor = "green";
  }
  if (!/^[A-Za-z ]+$/.test(lastName.value)) {
      showError("Enter a valid last name");
      lastName.style.borderColor = "red";
      return false;
  } else {
      lastName.style.borderColor = "green";
  }
  if (lastName.value.length <= 2){
      showError('Your last name is too short');
      lastName.style.borderColor = "red";
      return false;
  } else {
      lastName.style.borderColor = "green";
  }
};

const emailValidation = () => {
  if (email.value === ""){
    showError("Please enter email");
    email.style.borderColor = "red";
    return false;
  } else {
    email.style.borderColor = "green";
  }
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email.value)){
    showError("Enter valid email address");
    email.style.borderColor = "red";
    return false;
  } else {
    email.style.borderColor = "green";
  }
};

const ticketValidation = () => {
  if (ticketQty.selectedIndex < 1){
    showError('Please choose ticket amount');
    ticketQty.style.borderColor = "red";
    return false;
  } else {
    ticketQty.style.borderColor = "green";
  }
};

const monthValidation = () => {
  if (Number(month.value) < 1 || Number(month.value) > 12){
    showError("Enter a valid DOB month");
    month.style.borderColor = "red";
    return false;
  } else {
    month.style.borderColor = "green";
  }
};
const dayValidation = () => {
  if (Number(day.value) < 1 || Number(day.value) > 31){
    showError("Enter a valid DOB day");
    day.style.borderColor = "red";
    return false;
  } else {
    day.style.borderColor = "green";
  }
};
const yearValidation = () => {
  if (Number(year.value) < 1880 || Number(year.value) > 2010){
    showError("Enter a valid DOB year");
    year.style.borderColor = "red";
    return false;
  } else {
    year.style.borderColor = "green";
  }
};

const DOBValidation = () => {
  monthValidation();
  dayValidation();
  yearValidation();
};

const zipValidation = () => {
  if (zip.value.length !== 5){
    showError("Enter a valid zip code");
    zip.style.borderColor = "red";
    return false;
  } else {
    zip.style.borderColor = "green";
  }
};

const countryValidation = () => {
  country.style.borderColor = "green";
};

chrome.storage.sync.get("profile", storage => {
  if (storage.profile){
    firstName.value = storage.profile.fname;
    lastName.value = storage.profile.lname;
    ticketQty.selectedIndex = storage.profile.ticketQty;
    email.value = storage.profile.email;
    month.value = storage.profile.month;
    day.value = storage.profile.day;
    year.value = storage.profile.year;
    zip.value = storage.profile.zip;
    country.selectedIndex = storage.profile.selectedIndex;

    notify("Profile Loaded");
  }
});

const saveProfile = () => {
  const profile = {
    "fname": firstName.value,
    "lname": lastName.value,
    "ticketQty": ticketQty.selectedIndex,
    "email": email.value,
    "month": month.value,
    "day": day.value,
    "year": year.value,
    "zip": zip.value,
    "country": country.selectedIndex
  };

  return profile;
};

backButton.onclick = () => {
  notify("Back");
};

saveButton.onclick = () => {
  clearError();
  if (formValidation()){
    chrome.storage.sync.set({ "profile" : saveProfile() }, () => {
      notify("Saved");
    });
  }
};
