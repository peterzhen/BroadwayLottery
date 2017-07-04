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
  console.log("back!");
};

saveButton.onclick = () => {
  chrome.storage.sync.set({ "profile" : saveProfile() }, () => {
    console.log("saved!");
  });
};
