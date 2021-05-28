import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {ESC_CODE} from '../../const';
import {changeVisibilityMenu} from '../../store/actions';
import {Burger} from '../burger/burger';
import {CloseButton} from '../close-button/close-button';
import {Menu} from '../menu/menu';
import {Logo} from '../logo/logo';
import {SignIn} from '../sign-in/sign-in';

const MainNav = ({className}) => {

    const dispatch = useDispatch();
    const menuIsOpen = useSelector(state => state.menuIsOpen);

    useEffect(() => {
        const preventWheelScroll = (evt) => evt.preventDefault();
        if (menuIsOpen) {
            document.addEventListener('keydown', onEscClick);
            window.addEventListener('wheel', preventWheelScroll, {passive: false});
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', onEscClick);
            window.removeEventListener('wheel', preventWheelScroll);
            document.body.style.overflow = 'auto';
        };
    }, [menuIsOpen]);

    const onEscClick = (event) => {
        if (event.keyCode === ESC_CODE) {
            onClickClose();
        }
    };

    const onClickClose= () => {
        dispatch(changeVisibilityMenu(false));
    };

    return (
        <nav className={`${className} main-nav wrapper`}>
            <Burger className="main-nav__burger"/>
            <Logo className="main-nav__logo"/>
            <Menu className="main-nav__menu"/>
            {menuIsOpen
                ? <CloseButton className="main-nav__close" onClick={() => onClickClose()}/>
                : <SignIn className="main-nav__sign-in"/>
            }
        </nav>
    );
};

MainNav.propTypes = {
    className: PropTypes.string.isRequired
};

export {MainNav};
