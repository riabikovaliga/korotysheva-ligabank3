import React from 'react';
import PropTypes from 'prop-types';

const CloseButton = ({className, onClick}) => {
    return (
        <button className={`${className} close-button`} onClick={(evt) => onClick(evt)} type="button">Закрыть</button>
    );
};

CloseButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired
};

export {CloseButton};
