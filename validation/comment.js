const validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateCommentForm(data) {
  let errors = {};
  data.text = !isEmpty(data.text) ? data.text : "";
  if (validator.isEmpty(data.text)) {
    errors.text = "Text is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
