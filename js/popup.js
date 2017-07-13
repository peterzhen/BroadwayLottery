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
  "firstName" : $("#fNameInput"),
  "lastName" : $("#lNameInput"),
  "ticketQty" : $("#ticketQuantityInput"),
  "email" : $("#emailInput"),
  "month" : $("#monthInput"),
  "day" : $("#dayInput"),
  "year" : $("#yearInput"),
  "zip" : $("#zipInput"),
  "country" : $("#countryInput")
};

// notifications
const notification = $("#notification");
// form errors
const errors = $("#error-messages");

const notify = message => {
  notification.html(message);
  notification.css("opacity", "1");
  setTimeout( () => {
    notification.css("opacity", "0");
  }, 1000);
};

const showError = error => {
  errors.append(`<div style="color: #F44336;">${error}</div>`);
};

const clearError = () => {
  errors.empty();
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
      formElements.firstName.val(storage.profile.fname);
      formElements.lastName.val(storage.profile.lname);
      formElements.ticketQty.attr('selectedIndex', storage.profile.ticketQty);
      formElements.email.val(storage.profile.email);
      formElements.month.val(storage.profile.month);
      formElements.day.val(storage.profile.day);
      formElements.year.val(storage.profile.year);
      formElements.zip.val(storage.profile.zip);
      formElements.country.attr('selectedIndex', storage.profile.country);

      notify("Profile Loaded");
    }
  });
};

const saveProfile = () => {
  const profile = {
    "fname": formElements.firstName.val(),
    "lname": formElements.lastName.val(),
    "ticketQty": formElements.ticketQty.selectedIndex,
    "email": formElements.email.val(),
    "month": formElements.month.val(),
    "day": formElements.day.val(),
    "year": formElements.year.val(),
    "zip": formElements.zip.val(),
    "country": formElements.country.selectedIndex
  };

  return profile;
};

const clearForm = () => {
  for (let key in formElements) {
    formElements[key].css("borderColor", "");
    formElements[key].css("box-shadow", "");
    formElements[key].val("");
  }
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
  $("#profile-container").css("visibility", "hidden");
  $("#shows-container").css("marginLeft", "0px");
  clearError();
  clearForm();
  $('label').removeClass('active');
  Materialize.showStaggeredList('#show-list');
});

$('#edit-profile').on('click', () => {
  loadProfile();
  $("#profile-container").css("visibility", "visible");
  $("#shows-container").css("marginLeft", "-440px");
  $('label').addClass('active');
});

$('#clear-button').on('click', () => {
  clearError();
  notify("Profile Cleared");
  chrome.storage.sync.clear();
  clearForm();
});

$("#open-selected-button").on('click', () => {
  const selectedShows = [];

  $(".show-checkbox").each( (i, checkbox) => {
    if (checkbox.checked) selectedShows.push(Number(checkbox.value));
  });

  selectedShows.forEach( i => {
    chrome.tabs.create({
      url: showList[i],
      active: false
    }, tab => {
      // TODO Close tabs without valid lottery entry
    });
  });
});
