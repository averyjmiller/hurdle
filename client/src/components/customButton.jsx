import React from 'react';
import PropTypes from 'prop-types';
import 'hurdle/app.css';

function CustomButton({ buttonText }) {
  return (
    <button className="shadow__btn">
      {buttonText}
    </button>
  );
}

CustomButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

export default CustomButton;
