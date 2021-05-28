import PropTypes from 'prop-types';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeVisibilityMenu} from '../../store/actions';

const Burger = ({className}) => {
    const dispatch = useDispatch();
    const menuIsOpen = useSelector(state => state.menuIsOpen);

    const onClickBurger = () => {
        dispatch(changeVisibilityMenu(!menuIsOpen));
    };

    return (
        <button className={`${className} burger`} onClick={() => onClickBurger()} type="button">
          <span className="visually-hidden">
            Меню
          </span>
        </button>
    );
};

Burger.propTypes = {
    className: PropTypes.string
};

export {Burger};
