import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {PASSWORD_LENGTH} from '../../const';
import {changeVisibilityFormLogin, login} from '../../store/actions';
import {saveLoginToLocalStorage} from '../../local-storage-service';
import {getWordFormWithValue} from '../../utils';
import {Button} from '../button/button';
import {Input} from '../input/input';
import {Logo} from '../logo/logo';
import {Modal} from '../modal/modal';

const FormLogin = () => {
    const [email, setEmail] = useState(useSelector(state => state.email));
    const [password, setPassword] = useState(localStorage.getItem('password'));
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const emailInvalid = validateField('email', email);
        setErrorEmail(emailInvalid);
        const passwordInvalid = validateField('password', password);
        setErrorPassword(passwordInvalid);

        if (!emailInvalid && !passwordInvalid) {
            saveLoginToLocalStorage({email, password});
            dispatch(login(email));
            closeForm();
        }
    };

    const closeForm = () => {
        setErrorEmail('');
        setErrorPassword('');
        setEmail('');
        setPassword('');
        dispatch(changeVisibilityFormLogin(false));
    };

    const validateField = (fieldName, value) => {
        switch (fieldName) {
            case 'email':
                return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
                    ? '' : 'Email введен некорректно';
            case 'password':
                return value.length >= PASSWORD_LENGTH
                    ? '' : `Пароль должен быть больше ${getWordFormWithValue(PASSWORD_LENGTH, ['символ', 'символа', 'символов'])}`;
            default:
                break;
        }
    };

    return (
        <Modal closeModal={() => closeForm()}>
            <form className="form-login" noValidate onSubmit={(evt) => handleSubmit(evt)}>
                    <h2 className="visually-hidden">Введите e-mail и пароль</h2>
                    <div className="form-login__wrapper">
                        <Logo className="form-login__logo"/>
                        <Input id="email"
                                     defaultValue={email}
                                     label="Логин"
                                     className={`${errorEmail && 'input--error'} form-login__input`}
                                     type="email"
                                     desc={errorEmail}
                                     autoFocus
                                     onChange={(event) => {
                                    setErrorEmail('');
                                    setEmail(event.target.value);
                               }}/>
                        <div className="form-login__input-wrapper">
                            <Input id="password"
                                         defaultValue={password}
                                         label="Пароль"
                                         className={`${errorPassword && 'input--error'} form-login__input input--password`}
                                         type={isVisiblePassword ? 'text' : 'password'}
                                         desc={errorPassword}
                                         onChange={(event) => {
                                        setErrorPassword('');
                                        setPassword(event.target.value);
                                   }}/>
                            <button className="input__password-img" type="button" onClick={() => setIsVisiblePassword(!isVisiblePassword)}>
                                <svg className="" width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.29878 12L6.33638 11.4893L7.13618 8.59185C5.93899 8.16352 4.82634 7.5393 3.84654 6.7463L1.65854 8.86987L0.220528 7.47486L2.40955 5.35228C1.17386 3.91662 0.343585 2.19431 0 0.353927L2 0C2.77134 4.14262 6.50711 7.28557 11 7.28557C15.4919 7.28557 19.2287 4.14262 20 0L22 0.352941C21.6569 2.19358 20.827 3.91624 19.5915 5.35228L21.7795 7.47486L20.3415 8.86987L18.1535 6.7463C17.1737 7.5393 16.061 8.16352 14.8638 8.59185L15.6636 11.4903L13.7012 12L12.9004 9.10155C11.6426 9.31063 10.3574 9.31063 9.0996 9.10155L8.29878 12Z" fill="#1F1E25"/>
                                </svg>
                            </button>
                        </div>
                        <a className="form-login__link" href="/">Забыли пароль?</a>
                        <Button type="submit" className="form-login__submit" nameButton="Войти"/>
                    </div>
                </form>
        </Modal>
    );
};

export {FormLogin};
