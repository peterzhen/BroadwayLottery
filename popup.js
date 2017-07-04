const backButton = document.getElementById("back-button");
const saveButton = document.getElementById("save-button");

const saveProfile = () => {
  const firstName = document.getElementById("fNameInput");
  const lastName = document.getElementById("lNameInput");
  const ticketQty = document.getElementById("ticketQuantityInput");
  const email = document.getElementById("emailInput");
  const month = document.getElementById("monthInput");
  const day = document.getElementById("dayInput");
  const year = document.getElementById("yearInput");
  const zip = document.getElementById("zipInput");
  const country = document.getElementById("countryInput");

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
