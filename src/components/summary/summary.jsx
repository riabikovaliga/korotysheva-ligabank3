import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {CreditTarget} from '../../const';
import {getWordFormWithValue} from '../../utils';
import {Button} from '../button/button';
import {InputTel} from '../input-tel/input';
import {Input} from '../input/input';

const Summary = ({className, onClick}) => {
    const data = useSelector(state => state.data);
    const isAutoCredit = data && data.target === CreditTarget.AUTO_CREDIT;
    const [userData, setUserData] = useState({name: data.name, phone: data.phone, email: data.email});
    const [error, setError] = useState({});

    const onSubmitClick = () => {
        const phoneInvalid = validateField('phone', userData.phone);
        setError((prevError) => ({...prevError, phone: phoneInvalid}));
        const nameInvalid = validateField('name', userData.name);
        setError((prevError) => ({...prevError, name: nameInvalid}));
        const emailInvalid = validateField('email', userData.email);
        setError((prevError) => ({...prevError, email: emailInvalid}));
        if (!emailInvalid && !phoneInvalid && !nameInvalid) {
            setError({});
            onClick(userData);
        }
    };

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'email':
                return !!value && value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
                    ? '' : 'Email введен некорректно';
            case 'phone':
                return !!value && value.match(/(\+7|8)\d{3}-\d{3}-\d{2}-\d{2}/i)
                    ? '' : 'Телефон введен некорректно';
            case 'name':
                return !!value && value.length > 0
                    ? '' : 'ФИО не заполнено';
            default:
                break;
        }
    };

    if (!data) {
      return null;
    }

    return (
        <section className={`summary ${className}`}>
            <h3 className="summary__subtitle">Шаг 3. Оформление заявки</h3>
            <ul className="summary__list">
                <li className="summary__item list__item">
                    <span className="item__title">Номер заявки</span>
                    <span className="item__value">№ {data.count}</span>
                </li>
                <li className="summary__item list__item">
                    <span className="item__title">Цель кредита</span>
                    <span className="item__value">{isAutoCredit ? 'Автомобильное кредитование' : 'Ипотека'}</span>
                </li>
                <li className="summary__item list__item">
                    <span className="item__title">Стоимость {isAutoCredit ? 'автомобиля' : 'недвижимости'}</span>
                    <span className="item__value">{data.cost.toLocaleString()} рублей</span>
                </li>
                <li className="summary__item list__item">
                    <span className="item__title">Первоначальный взнос</span>
                    <span className="item__value">{data.fee.toLocaleString()} рублей</span>
                </li>
                <li className="summary__item list__item">
                    <span className="item__title">Срок кредитования</span>
                    <span className="item__value">{getWordFormWithValue(data.period, ['год', 'года', 'лет'])}</span>
                </li>
            </ul>
            <Input className={`summary__input ${error.name && 'input--error'}`}
                         onChange={(evt) => {
                       setError({...error, name: ''});
                       setUserData({...userData, name: evt.target.value});
                   }}
                         defaultValue={userData.name}
                         autoFocus
                         desc={error.name}
                         placeholder="ФИО"
                         type="string"/>
            <div className="summary__group">
                <InputTel className={`summary__input ${error.phone && 'input--error'}`}
                          onChange={(evt) => {
                               setError({...error, phone: ''});
                               setUserData({...userData, phone: evt.target.value});
                          }}
                          value={userData.phone}
                          desc={error.phone}
                          placeholder="Телефон"/>
                <Input className={`summary__input ${error.email && 'input--error'}`}
                             onChange={(evt) => {
                           setError({...error, email: ''});
                           setUserData({...userData, email: evt.target.value});
                       }}
                             defaultValue={userData.email}
                             desc={error.email}
                             placeholder="E-mail"
                             type="email"/>
            </div>
            <Button className="summary__submit" nameButton="Отправить" onClick={() => onSubmitClick()}/>

        </section>
    );
};

Summary.propTypes = {
    className: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export {Summary};
