import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

const Menu = ({className}) => {
    const menuIsOpen = useSelector(state => state.menuIsOpen);

    return (
        <div className={`menu ${className} ${!menuIsOpen && 'menu--closed'}`}>
            <span className="menu__item">
                <a href="/" className="menu__link">
                    Услуги
                </a>
            </span>
            <span className="menu__item menu__item--active">
                <a href="/" className="menu__link menu__link--active">
                   Рассчитать кредит
                </a>
            </span>
            <span className="menu__item menu__item--only-header">
                <a href="/" className="menu__link">
                    Конвертер валют
                </a>
            </span>
            <span className="menu__item">
                <a href="/" className="menu__link">
                    Контакты
                </a>
            </span>
            <span className="menu__item menu__item--only-footer">
                <a href="/" className="menu__link">
                    Задать вопрос
                </a>
            </span>
        </div>
    );
};

Menu.propTypes = {
    className: PropTypes.string.isRequired
};

export {Menu};
