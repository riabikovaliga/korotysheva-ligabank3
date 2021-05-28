import React from 'react';
import PropTypes from 'prop-types';
import {InputFormat} from '../input-format/input-format';

const NamesButton = {
    PLUS: 'PLUS',
    MINUS: 'MINUS',
};

const InputWithButtons = ({className, onChange, step, value, ...rest}) => {

    const onValueChange = (target) => {
        switch (target) {
            case NamesButton.MINUS:
                return onChange(Number(value) - step);
            case NamesButton.PLUS:
                return onChange(Number(value) + step);
            default:
                return onChange(target);
        }
    };

    return (
        <div className={`input-with-buttons ${className}`}>
            <button onClick={(evt) => onValueChange(evt.target.name)} className="input-with-buttons__button input-with-buttons__button--minus" name={NamesButton.MINUS}>−</button>
            <button onClick={(evt) => onValueChange(evt.target.name)} className="input-with-buttons__button input-with-buttons__button--plus" name={NamesButton.PLUS}>+</button>
            <InputFormat {...rest}
                         value={value}
                         onChangeValue={(value) => onValueChange(value)}
                         className="input-with-buttons__input"/>
        </div>
    );
};

InputWithButtons.propTypes = {
    className: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    label: PropTypes.string,
    step: PropTypes.number
};

export {InputWithButtons};
