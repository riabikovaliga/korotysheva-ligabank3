import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

const Select = ({options, onChange, title, className}) => {
    const [isOpenSelect, setIsOpenSelect] = useState(false);
    const target = useSelector(state => state.target);

    const onSelectClick = () => {
        setIsOpenSelect(!isOpenSelect);
    };

    return (
        <div onClick={() => onSelectClick()} className={`${className} select ${isOpenSelect ? 'select--open' : 'select--close'}`}>
            <span className="select__option select__option--title" tabIndex="0">
                {isOpenSelect ? title: options[target] || title}
            </span>
            {isOpenSelect &&
                <ul className={'select__options'}>
                    {Object.keys(options).map((key) =>
                        <span onClick={() => onChange(key)}
                            key={key}
                            className="select__option"
                            tabIndex="0">
                            {options[key]}
                        </span>
                    )}
                </ul>
            }
        </div>
    );
};

Select.propTypes = {
    className: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};

export {Select};
