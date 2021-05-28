import React from 'react';
import PropTypes from 'prop-types';

const Button = ({nameButton, className, ...rest}) => {

    return (
        <button className={`button ${className}`}
                {...rest}>
                {nameButton}
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string.isRequired,
    nameButton: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.string
};

export {Button};
