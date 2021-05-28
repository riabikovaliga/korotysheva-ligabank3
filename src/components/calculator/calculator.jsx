import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {AutoCreditConsts, CreditTarget, MortgageConsts} from '../../const';
import {saveUserDataToLocalStorage} from '../../local-storage-service';
import {getCostOfPercent, getValidValue} from '../../utils';
import {CalculatorOptions} from '../calculator-options/calculator-options';
import {SuccessModal} from '../success-modal/success-modal';
import {Summary} from '../summary/summary';
import {
    changeTarget, deleteData, saveData,
} from '../../store/actions';

const Calculator = ({className}) => {
    const dispatch = useDispatch();

    const [isOpenForm, setIsOpenForm] = useState(false);
    const [successIsOpen, setSuccessIsOpen] = useState(false);

    const cost = useSelector(state => state.cost);
    const fee = useSelector(state => state.fee);
    const period = useSelector(state => state.period);
    const data = useSelector(state => state.data);
    const target = useSelector(state => state.target);
    const isAutoCredit = useSelector(state => state.target === CreditTarget.AUTO_CREDIT);
    const minCost = isAutoCredit ? AutoCreditConsts.MIN_COST : MortgageConsts.MIN_COST;
    const maxCost = isAutoCredit ? AutoCreditConsts.MAX_COST : MortgageConsts.MAX_COST;
    const useCapital = useSelector(state => state.useCapital);
    const minCredit = isAutoCredit ? AutoCreditConsts.MIN_CREDIT : MortgageConsts.MIN_CREDIT;
    const maxFeeCost = getValidValue(cost, minCost, maxCost) - minCredit - MortgageConsts.PARENT_CAPITAL * (useCapital && !isAutoCredit);
    const minFee = isAutoCredit ? AutoCreditConsts.MIN_FEE : MortgageConsts.MIN_FEE;

    const onSuggestButtonClick = () => {
        dispatch(saveData({
            count: data.count + 1,
            target: target,
            cost: getValidValue(cost, minCost, maxCost),
            fee: getValidValue(fee, getCostOfPercent(minFee, getValidValue(cost, minCost, maxCost)), maxFeeCost),
            period: period,
        }));
        setIsOpenForm(true);
    };
    const onSubmitClick = ({name, phone, email}) => {
        dispatch(deleteData());
        dispatch(saveData({
            count: data.count + 1
        }));
        saveUserDataToLocalStorage({name, phone, email});
        dispatch(saveData({email, phone, name}));
        setSuccessIsOpen(true);
        setIsOpenForm(false);
        dispatch(changeTarget(null));
    };

    return (
        <section className={`${className} calculator wrapper`} id="calculator">
            <h2 className="calculator__title">Кредитный калькулятор</h2>
            <CalculatorOptions className="calculator__options" onSuggestButtonClick={() => onSuggestButtonClick()}/>
            {isOpenForm &&
            <Summary className="calculator__summary" onClick={(userData) => onSubmitClick(userData)}/>}
            {successIsOpen &&
            <SuccessModal className="calculator__success" changeVisibilitySuccess={(value) => setSuccessIsOpen(value)}/>}
        </section>
    );
};

Calculator.propTypes = {
    className: PropTypes.string.isRequired
};

export {Calculator};
