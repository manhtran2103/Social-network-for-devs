const validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateRegisterForm(data) {
  let errors = {};
  data.name = data.name.trim().length == 0 ? "" : data.name;
  data.email = data.email.trim().length == 0 ? "" : data.email;
  data.password = data.password.trim().length == 0 ? "" : data.password;
  data.password2 = data.password2.trim().length == 0 ? "" : data.password2;
  if (!validator.isLength(data.name, { min: 1, max: 30 })) {
    errors.name = "Name must be between 1 and 30 characters";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Invalid Email";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (!validator.isLength(data.password, { min: 6 })) {
    errors.password = "Confirm password must be minimum 6 characters";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Password is not matched";
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required";
  }
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
