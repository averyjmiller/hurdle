import PropTypes from 'prop-types';
import './customButton.css';

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
