const validator = require("validator");
module.exports = function validateLoginForm(data) {
  let errors = {};
  data.email = data.email.trim().length == 0 ? "" : data.email;
  data.password = data.password.trim().length == 0 ? "" : data.password;
  if (!validator.isEmail(data.email)) {
    errors.email = "Invalid Email";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
