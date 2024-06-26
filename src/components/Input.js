// Input Component
import React from "react";
import PropTypes from "prop-types";

const Input = ({label, onInput, inputRef}) => {

  return (
    <div className="input-box">
      <span className="label">
       {label}
      </span>
      <input type="text" onChange={onInput} ref={inputRef} />
    </div>
  )
};

Input.prototype = {
  label: PropTypes.string.isRequired,
  onSet: PropTypes.func,
  inputRef: PropTypes.object
}
export default Input;
