import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {
    AutoCreditConsts,
    CreditTarget,
    MortgageConsts,
    MOUNTS_IN_YEAR,
    PART_PAYMENT_OF_INCOME
} from '../../const';
import {getCostOfPercent, getValidValue, getWordFormWithValue} from '../../utils';
import {Button} from '../button/button';

const Suggest = ({className, onClick}) => {
    const isAutoCredit = useSelector(state => state.target === CreditTarget.AUTO_CREDIT);
    const minCredit = isAutoCredit ? AutoCreditConsts.MIN_CREDIT : MortgageConsts.MIN_CREDIT;
    const minCost = isAutoCredit ? AutoCreditConsts.MIN_COST : MortgageConsts.MIN_COST;
    const maxCost = isAutoCredit ? AutoCreditConsts.MAX_COST : MortgageConsts.MAX_COST;
    const cost = useSelector(state => getValidValue(state.cost, minCost, maxCost));
    const useCapital = useSelector(state => state.useCapital);
    const maxFeeCost = cost - minCredit - MortgageConsts.PARENT_CAPITAL * (useCapital && !isAutoCredit);
    const minFee = isAutoCredit ? AutoCreditConsts.MIN_FEE : MortgageConsts.MIN_FEE;
    const fee = useSelector(state => getValidValue(state.fee, getCostOfPercent(minFee, cost), maxFeeCost));
    const creditSum = useSelector(state => cost - fee - MortgageConsts.PARENT_CAPITAL *
                                    (state.useCapital && state.target === CreditTarget.MORTGAGE)) || minCredit;
    const useComprehensiveCover = useSelector(state => state.useComprehensiveCover);
    const useInsurance = useSelector(state => state.useInsurance);
    const period = useSelector(state => state.period);

    const getPercents = () => {
        let percent = AutoCreditConsts.MAX_INTEREST_RATE;
        if (isAutoCredit) {
            if (cost >= AutoCreditConsts.MONEY_BORDER) {
                percent = AutoCreditConsts.MIN_INTEREST_RATE;
            }
            if (useComprehensiveCover || useInsurance) {
                percent = AutoCreditConsts.MAX_INTEREST_RATE_ADD;
            }
            if (useComprehensiveCover && useInsurance) {
                percent = AutoCreditConsts.MIN_INTEREST_RATE_ALL_ADD;
            }
        }
        else {
            if (fee * 100 < MortgageConsts.PERCENT_FEE_OF_COST_BORDER * cost) {
                percent = MortgageConsts.MAX_INTEREST_RATE;
            } else {
                percent = MortgageConsts.MIN_INTEREST_RATE;
            }
        }
        return percent;
    };

    const getMonthlyPayment = () => {
        const interestRate = (getPercents() / 100) / MOUNTS_IN_YEAR;
        return Math.ceil(creditSum *
            (interestRate + (interestRate/(Math.pow(1 + interestRate,period * MOUNTS_IN_YEAR) - 1))));
    };

    const getRequiredIncome = () => {
        return Math.ceil(getMonthlyPayment() * 100 / PART_PAYMENT_OF_INCOME);
    };

    return (
        <section className={`suggest ${className}`}>
            <h3 className="suggest__subtitle">Наше предложение</h3>
            <div className="suggest__wrapper">
                <div className="suggest__top">
                    <p className="suggest__result">
                        {creditSum.toLocaleString()} рублей
                        <small className="suggest__desc">
                            Сумма {isAutoCredit ? 'автокредита' : 'ипотеки'}
                        </small>
                    </p>
                    <p className="suggest__result">
                        {getPercents()}%
                        <small className="suggest__desc">
                            Процентная ставка
                        </small>
                    </p>
                </div>
                <div className="suggest__bottom">
                    <p className="suggest__result">
                        {getWordFormWithValue(getMonthlyPayment(), ['рубль', 'рубля', 'рублей'])}
                        <small className="suggest__desc">
                            Ежемесячный платеж
                        </small>
                    </p>
                    <p className="suggest__result">
                        {getWordFormWithValue(getRequiredIncome(), ['рубль', 'рубля', 'рублей'])}
                        <small className="suggest__desc">
                            Необходимый доход
                        </small>
                    </p>
                </div>
            </div>
            <Button className="suggest__button" nameButton="Оформить заявку" onClick={() => onClick()}/>
        </section>
    );
};

Suggest.propTypes = {
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export {Suggest};
