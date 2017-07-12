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

$("#save-button").on("click", () => {
  clearError();
  if (formValidation()){
    chrome.storage.sync.set({ "profile" : saveProfile() }, () => {
      notify("Saved");
    });
  }
});

$("#back-button").on("click", () => {
  document.getElementById("profile-container").style.visibility = "hidden";
  document.getElementById("shows-container").style.marginLeft = "0px";
  clearError();
  for (let key in formElements) {
    formElements[key].style.borderColor = "";
    formElements[key].value = "";
  }
  $('label').removeClass('active');
  Materialize.showStaggeredList('#show-list');
});

$('#edit-profile').on('click', () => {
  loadProfile();
  document.getElementById("profile-container").style.visibility = "visible";
  document.getElementById("shows-container").style.marginLeft = "-440px";
  $('label').addClass('active');
});

$("#open-selected-button").on('click', () => {
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
      // TODO Close tabs without valid lottery entry
    });
  });
});
