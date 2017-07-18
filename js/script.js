const fillProfile = profile => {
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
    firstName.value = profile.fname;
    lastName.value = profile.lname;
    ticketQty.options.selectedIndex = profile.ticketQty;
    email.value = profile.email;
    month.value = profile.month;
    day.value = profile.day;
    year.value = profile.year;
    zip.value = profile.zip;
    country.options.selectedIndex = profile.country;
    tos.checked = true;
  } catch (e) {
    console.log("Form not available:", e.toString());
  }
};

fillProfile(profile);
