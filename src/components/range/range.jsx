import React from 'react';
import PropTypes from 'prop-types';
import {InputFormat} from '../input-format/input-format';

const Range = ({className, label, desc, onChangeInput, onChangeRange, value, max, min, step, range, ...rest}) => {

    return (
        <div className={`${className} range`}>
            <InputFormat className="range__input"
                         label={label}
                         onChangeValue={(value) => onChangeInput(value)}
                         value={value}
                         {...rest}/>
            <input className="range__slider"
                   type="range"
                   onChange={(evt) => onChangeRange(evt)}
                   step={step}
                   value={range}
                   max={max}
                   min={min}/>
            <span className="range__desc">
              {desc}
            </span>
        </div>
    );
};

Range.propTypes = {
    className: PropTypes.string.isRequired,
    onChangeInput: PropTypes.func.isRequired,
    onChangeRange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    label: PropTypes.string,
    desc: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    range: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Range.defaultProps = {
    step: 1
};

export {Range};
