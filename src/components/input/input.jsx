import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
    return (
        <label className={`${props.className} input`}>
            <span className="input__label">
              {props.label}
            </span>
            <input {...props} className="input__text" type={props.type || 'number'}/>
            <span className="input__desc">
              {props.desc}
            </span>
        </label>
    );
};

Input.propTypes = {
    className: PropTypes.string.isRequired,
    onChangeValue: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    label: PropTypes.string,
    desc: PropTypes.string,
    type: PropTypes.string,
    mask: PropTypes.string
};

export {Input};
