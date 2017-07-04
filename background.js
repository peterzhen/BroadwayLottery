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

    firstName.value = storage.profile.fname;
    lastName.value = storage.profile.lname;
    ticketQty.options.selectedIndex = storage.profile.ticketQty;
    email.value = storage.profile.email;
    month.value = storage.profile.month;
    day.value = storage.profile.day;
    year.value = storage.profile.year;
    zip.value = storage.profile.zip;
    country.options.selectedIndex = storage.profile.selectedIndex;
    tos.checked = true;
  }
};

chrome.storage.sync.get("profile", storage => {
  fillForm(storage);
});
