const firstNameValidation = () => {
  if (formElements.firstName.value === ""){
      showError('Please enter first name');
      formElements.firstName.style.borderColor = "#F44336";
      return false;
  } else {
      formElements.firstName.style.borderColor = "#4CAF50";
  }
  if (!/^[a-zA-Z ]{2,30}$/.test(formElements.firstName.value)) {
      showError("Enter a valid first name");
      formElements.firstName.style.borderColor = "#F44336";
      return false;
  } else {
      formElements.firstName.style.borderColor = "#4CAF50";
  }
};

const lastNameValidation = () => {
  if (formElements.lastName.value === ""){
      showError('Please enter last name');
      formElements.lastName.style.borderColor = "#F44336";
      return false;
  } else {
      formElements.lastName.style.borderColor = "#4CAF50";
  }
  if (!/^[a-zA-Z ]{2,30}$/.test(formElements.lastName.value)) {
      showError("Enter a valid last name");
      formElements.lastName.style.borderColor = "#F44336";
      return false;
  } else {
      formElements.lastName.style.borderColor = "#4CAF50";
  }
};

const emailValidation = () => {
  if (formElements.email.value === ""){
    showError("Please enter email");
    formElements.email.style.borderColor = "#F44336";
    formElements.email.style.boxShadow = "0 1px 0 0 #F44336";
    return false;
  } else {
    formElements.email.style.borderColor = "#4CAF50";
  }
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(formElements.email.value)){
    showError("Enter valid email address");
    formElements.email.validity.patternMismatch = true;
    formElements.email.style.borderColor = "#F44336";
    return false;
  } else {
    formElements.email.style.borderColor = "#4CAF50";
  }
};

const ticketValidation = () => {
  if (formElements.ticketQty.selectedIndex < 1){
    showError('Please choose ticket amount');
    formElements.ticketQty.style.borderColor = "#F44336";
    return false;
  } else {
    formElements.ticketQty.style.borderColor = "#4CAF50";
  }
};

const monthValidation = () => {
  if (isNaN(formElements.month.value) || !inRange(Number(formElements.month.value), 1, 12)){
    showError("Enter a valid DOB month");
    formElements.month.style.borderColor = "#F44336";
    return false;
  } else {
    formElements.month.style.borderColor = "#4CAF50";
  }
};
const dayValidation = () => {
  if (isNaN(formElements.day.value) || !inRange(Number(formElements.day.value), 1, 31)){
    showError("Enter a valid DOB day");
    formElements.day.style.borderColor = "#F44336";
    return false;
  } else {
    formElements.day.style.borderColor = "#4CAF50";
  }
};
const yearValidation = () => {
  if (isNaN(formElements.year.value) || !inRange(Number(formElements.year.value), 1850, 2010)){
    showError("Enter a valid DOB year");
    formElements.year.style.borderColor = "#F44336";
    return false;
  } else {
    formElements.year.style.borderColor = "#4CAF50";
  }
};

const zipValidation = () => {
  if (formElements.zip.value.length !== 5){
    showError("Enter a valid zip code");
    formElements.zip.style.borderColor = "#F44336";
    return false;
  } else {
    formElements.zip.style.borderColor = "#4CAF50";
  }
};

const countryValidation = () => {
  formElements.country.style.borderColor = "#4CAF50";
};

const inRange = (number, low, high) => {
  return (number >= low && number <= high);
};
