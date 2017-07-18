$(document).ready(function() {
    $('select').material_select();
    Materialize.showStaggeredList('#show-list');
    Materialize.showStaggeredList('#profile-list');
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

const profiles = { "profiles" : [] };

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

const loadProfiles = () => {
  chrome.storage.sync.get("profiles", storage => {
    if (storage.profiles){
      profiles.profiles = storage.profiles;
      profiles.profiles.forEach( (profile, index) => {
        $("#profile-list").append(createProfile(profile, index));
        $(`#edit-button-${index}`).on("click", () => {
          editProfile(index);
        });
      });

      Materialize.showStaggeredList('#profile-list');
    }
  });
};

const editProfile = index => {
  $("#shows-container").css("marginLeft", "-880px");
  loadProfile(index);
  $('label').addClass('active');
};

const createProfile = (profile, index) => {
  const userName = `${profile.fname} ${profile.lname}`;
  const $profileContent = $(`<li class="collection-item">
                              <div class="profile-name">
                                <i class="material-icons profile-icon">account_circle</i>${userName}
                                <a href="#!" id="edit-button-${index}" class="secondary-content">
                                  <i class="material-icons">edit</i>
                                </a>
                              </div>
                            </li>`);
  return $profileContent;
};

const loadProfile = index => {
  formElements.firstName.val(profiles.profiles[index].fname);
  formElements.lastName.val(profiles.profiles[index].lname);
  formElements.ticketQty.prop('selectedIndex', profiles.profiles[index].ticketQty);
  formElements.email.val(profiles.profiles[index].email);
  formElements.month.val(profiles.profiles[index].month);
  formElements.day.val(profiles.profiles[index].day);
  formElements.year.val(profiles.profiles[index].year);
  formElements.zip.val(profiles.profiles[index].zip);
  formElements.country.prop('selectedIndex', profiles.profiles[index].country);

  notify("Profile Loaded");
};

const saveProfile = () => {
  if (formElements.ticketQty[0].selectedIndex === -1){
    formElements.ticketQty[0].selectedIndex = 2;
  }
  if (formElements.country[0].selectedIndex === -1){
    formElements.country[0].selectedIndex = 2;
  }
  const profile = {
    "fname": formElements.firstName.val(),
    "lname": formElements.lastName.val(),
    "ticketQty": formElements.ticketQty.prop("selectedIndex"),
    "email": formElements.email.val(),
    "month": formElements.month.val(),
    "day": formElements.day.val(),
    "year": formElements.year.val(),
    "zip": formElements.zip.val(),
    "country": formElements.country.prop("selectedIndex")
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
    profiles.profiles.push(saveProfile());
    chrome.storage.sync.set({ "profiles" : profiles.profiles }, () => {
      notify("Saved");
    });
  }
});

$("#pflist-back-button").on("click", () => {
  $("#shows-container").css("marginLeft", "0px");
  $('label').removeClass('active');
  Materialize.showStaggeredList('#show-list');
});

$("#pfedit-back-button").on("click", () => {
  $('#profile-list li:not(:first)').remove();
  loadProfiles();
  clearError();
  clearForm();
  $("#shows-container").css("marginLeft", "-440px");
  $('label').removeClass('active');
});

$('#edit-profiles').on('click', () => {
  $('#profile-list li:not(:first)').remove();
  loadProfiles();
  $("#shows-container").css("marginLeft", "-440px");
});

$("#add-profile-button").on('click', () => {
  $("#shows-container").css("marginLeft", "-880px");
  $('label').addClass('active');
});

$('#delete-button').on('click', () => {
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
