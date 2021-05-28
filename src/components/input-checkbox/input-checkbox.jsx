import React from 'react';
import PropTypes from 'prop-types';

const InputCheckbox = ({className, value, onChange, label}) => {

    return (
        <label className={`${className} input-checkbox`}>
            <input
                onChange={(evt) => onChange(evt.target.checked)}
                type="checkbox"
                checked={value}/>
            <span>
                &nbsp;{label}
            </span>
        </label>
    );
};

InputCheckbox.propTypes = {
    className: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string
};

export {InputCheckbox};
