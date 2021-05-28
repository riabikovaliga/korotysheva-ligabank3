import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {CreditTargetNames} from '../../const';
import {Select} from '../select/select';
import {changeTarget} from '../../store/actions';

const CalculatorSelect = ({className}) => {
    const dispatch = useDispatch();

    const onTargetChange = (value) => {
        dispatch(changeTarget(value));
    };

    return (
        <section className={`${className} calculator-select`}>
            <h3 className="calculator-select__subtitle">Шаг 1. Цель кредита</h3>
            <Select
                className="calculator-select__select"
                options={CreditTargetNames}
                title={'Выберите цель кредита'}
                onChange={(value) => onTargetChange(value)}
            />
        </section>
    );
};

CalculatorSelect.propTypes = {
    className: PropTypes.string.isRequired
};

export {CalculatorSelect};
