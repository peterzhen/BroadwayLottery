const clickOpenShow = () => {
  try {
    const openButtons = document.getElementsByClassName("enter-button");
    for (let i = 0; i < openButtons.length; i++){
      openButtons[i].click();
    }
  } catch(e) {
    console.log("Enter button not available", e);
  }
};

const fillForm = storage => {
  if (storage.profile){
    const firstName = document.getElementById("dlslot_name_first");
    const lastName = document.getElementById("dlslot_name_last");
    const ticketQty = document.getElementById("dlslot_ticket_qty");
    const email = document.getElementById("dlslot_email");
    const month = document.getElementById("dlslot_dob_month");
    const day = document.getElementById("dlslot_dob_day");
    const year = document.getElementById("dlslot_dob_year");
    const zip = document.getElementById("dlslot_zip");
    const country = document.getElementById("dlslot_country");
    const tos = document.getElementById("dlslot_agree");

    try {
      firstName.value = storage.profile.fname;
      lastName.value = storage.profile.lname;
      ticketQty.options.selectedIndex = storage.profile.ticketQty;
      email.value = storage.profile.email;
      month.value = storage.profile.month;
      day.value = storage.profile.day;
      year.value = storage.profile.year;
      zip.value = storage.profile.zip;
      country.options.selectedIndex = storage.profile.country;
      tos.checked = true;
    } catch (e) {
      console.log("Form not available:", e.toString());
    }
  }
};

clickOpenShow();

chrome.storage.sync.get("profile", storage => {
  fillForm(storage);
});
