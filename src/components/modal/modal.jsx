import PropTypes from 'prop-types';
import React, {useRef, useEffect} from 'react';
import {ESC_CODE} from '../../const';
import {CloseButton} from '../close-button/close-button';

const Modal = ({children, closeModal}) => {
    const overlayRef = useRef();

    useEffect(() => {
        const preventWheelScroll = (evt) => evt.preventDefault();
        document.addEventListener('keydown', onEscClick);
        window.addEventListener('wheel', preventWheelScroll, { passive: false });
        return () => {
            document.removeEventListener('keydown', onEscClick);
            window.removeEventListener('wheel', preventWheelScroll);
        };
    }, []);

    const onCloseFormButtonClick = () => {
        closeModal();
    };

    const onEscClick = (event) => {
        if (event.keyCode === ESC_CODE) {
            closeModal();
        }
    };

    const onOverlayClick = (evt) => {
        evt.target === overlayRef.current && closeModal();
    };

    return (
        <div className="overlay" ref={overlayRef} onClick={onOverlayClick}>
            <div className="modal">
                <CloseButton onClick={() => onCloseFormButtonClick()} className="form-login__close"/>
                {children}
            </div>
        </div>
    );
};

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired
};

export {Modal};

