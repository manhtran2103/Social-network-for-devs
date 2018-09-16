import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
const TextFieldGroup = ({
  type,
  name,
  placeholder,
  value,
  label,
  onChange,
  error,
  info
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        label={label}
      />
      {error && <div className="invalid-feedback">{error}</div>}
      <small className="form-text text-muted">{info}</small>
    </div>
  );
};

TextFieldGroup.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  info: PropTypes.string
};

TextFieldGroup.defaulProps = {
  type: "text"
};

export default TextFieldGroup;
