const firstNameValidation = () => {
  if (formElements.firstName.val() === ""){
      showError('Please enter first name');
      formElements.firstName.css("borderColor", "#F44336");
      return false;
  } else {
      formElements.firstName.css("borderColor", "#4CAF50");
  }
  if (!/^[a-zA-Z ]{2,30}$/.test(formElements.firstName.val())) {
      showError("Enter a valid first name");
      formElements.firstName.css("borderColor", "#F44336");
      return false;
  } else {
      formElements.firstName.css("borderColor", "#4CAF50");
  }
};

const lastNameValidation = () => {
  if (formElements.lastName.val() === ""){
      showError('Please enter last name');
      formElements.lastName.css("borderColor", "#F44336");
      return false;
  } else {
      formElements.lastName.css("borderColor", "#4CAF50");
  }
  if (!/^[a-zA-Z ]{2,30}$/.test(formElements.lastName.val())) {
      showError("Enter a valid last name");
      formElements.lastName.css("borderColor", "#F44336");
      return false;
  } else {
      formElements.lastName.css("borderColor", "#4CAF50");
  }
};

const emailValidation = () => {
  if (formElements.email.val() === ""){
    showError("Please enter email");
    formElements.email.css("borderColor", "#F44336");
    formElements.email.css("boxShadow", "0 1px 0 0 #F44336");
    return false;
  } else {
    formElements.email.css("borderColor", "#4CAF50");
  }
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(formElements.email.val())){
    showError("Enter valid email address");
    formElements.email.css("borderColor", "#F44336");
    return false;
  } else {
    formElements.email.css("borderColor", "#4CAF50");
  }
};

const ticketValidation = () => {
  if (formElements.ticketQty.selectedIndex < 1){
    showError('Please choose ticket amount');
    formElements.ticketQty.css("borderColor", "#F44336");
    return false;
  } else {
    formElements.ticketQty.css("borderColor", "#4CAF50");
  }
};

const monthValidation = () => {
  if (isNaN(formElements.month.val()) || !inRange(Number(formElements.month.val()), 1, 12)){
    showError("Enter a valid DOB month");
    formElements.month.css("borderColor", "#F44336");
    return false;
  } else {
    formElements.month.css("borderColor", "#4CAF50");
  }
};
const dayValidation = () => {
  if (isNaN(formElements.day.val()) || !inRange(Number(formElements.day.val()), 1, 31)){
    showError("Enter a valid DOB day");
    formElements.day.css("borderColor", "#F44336");
    return false;
  } else {
    formElements.day.css("borderColor", "#4CAF50");
  }
};
const yearValidation = () => {
  if (isNaN(formElements.year.val()) || !inRange(Number(formElements.year.val()), 1850, 2010)){
    showError("Enter a valid DOB year");
    formElements.year.css("borderColor", "#F44336");
    return false;
  } else {
    formElements.year.css("borderColor", "#4CAF50");
  }
};

const zipValidation = () => {
  if (formElements.zip.val().length !== 5){
    showError("Enter a valid zip code");
    formElements.zip.css("borderColor", "#F44336");
    return false;
  } else {
    formElements.zip.css("borderColor", "#4CAF50");
  }
};

const countryValidation = () => {
  formElements.country.css("borderColor", "#4CAF50");
};

const inRange = (number, low, high) => {
  return (number >= low && number <= high);
};
