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
    if (firstName.value === ""){
        showError('Please Enter First Name');
        firstName.style.borderColor = "red";
        return false;
    } else {
        firstName.style.borderColor = "green";
    }
    if (/^[0-9]+$/.test(firstName.value)) {
        showError("First Name Contains Numbers!");
        firstName.style.borderColor = "red";
        return false;
    }else{
        firstName.style.borderColor = "green";
    }
    if (firstName.value.length <= 2){
        showError('Your Name is To Short');
        firstName.style.borderColor = "red";
        return false;
    }else{
        firstName.style.borderColor = "green";
    }
    return true;
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
