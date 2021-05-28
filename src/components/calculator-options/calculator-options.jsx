import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {AutoCreditConsts, CreditTarget, MortgageConsts} from '../../const';
import {CalculatorInputs} from '../calculator-inputs/calculator-inputs';
import {CalculatorSelect} from '../calculator-select/calculator-select';
import {InfoError} from '../info-block/info-block';
import {Suggest} from '../suggest/suggest';
import {
    changeCost,
    changeFee,
    changePeriod,
    changeUseCapital, changeUseComprehensiveCover, changeUseInsurance
} from '../../store/actions';

const CalculatorOptions = ({className, onSuggestButtonClick}) => {
    const dispatch = useDispatch();
    const target = useSelector(state => state.target);
    const isAutoCredit = useSelector(state => state.target === CreditTarget.AUTO_CREDIT);
    const creditSum = useSelector(state => state.cost - state.fee - MortgageConsts.PARENT_CAPITAL * (state.useCapital && state.target === CreditTarget.MORTGAGE));
    const minCredit = useSelector(state => state.target === CreditTarget.AUTO_CREDIT ? AutoCreditConsts.MIN_CREDIT : MortgageConsts.MIN_CREDIT);

    useEffect(() => {
        resetForm();
    }, [target]);

    const resetForm = () => {
        const cost = isAutoCredit ? AutoCreditConsts.MIN_COST : MortgageConsts.MIN_COST;
        dispatch(changeCost(cost));
        dispatch(changeFee(Math.ceil((isAutoCredit ? AutoCreditConsts.MIN_FEE : MortgageConsts.MIN_FEE) * cost) / 100));
        dispatch(changePeriod(isAutoCredit ? AutoCreditConsts.MIN_PERIOD : MortgageConsts.MIN_PERIOD));
        dispatch(changeUseCapital(false));
        dispatch(changeUseComprehensiveCover(false));
        dispatch(changeUseInsurance(false));
    };

    return (
        <div className={`${className} calculator-options`}>
            <div className="calculator-options__left">
                <CalculatorSelect className="calculator-options__select"/>
                {target !== null &&
                    <CalculatorInputs className="calculator-options__inputs" />
                }
            </div>
            <div className="calculator-options__right">
                {target !== null &&
                    <>
                        {creditSum < minCredit
                            ? <InfoError className="calculator-options__error"/>
                            : <Suggest className="calculator-options__suggest" onClick={() => onSuggestButtonClick()}/>
                        }
                    </>
                }
            </div>
        </div>
    );
};

CalculatorOptions.propTypes = {
    className: PropTypes.string.isRequired,
    onSuggestButtonClick: PropTypes.func.isRequired
};

export {CalculatorOptions};
