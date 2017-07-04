const fillForm = profile => {
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

  firstName.value = "Peter";
  lastName.value = "Zhen";
  ticketQty.options.selectedIndex = 2;
  email.value = "peterzhen0713@gmail.com";
  month.value = "07";
  day.value = "13";
  year.value = "1989";
  zip.value = "11370";
  country.options.selectedIndex = profile.country.selectedIndex;
  tos.checked = true;
};

chrome.storage.sync.get("profile", profile => {
  fillForm(profile);
});
