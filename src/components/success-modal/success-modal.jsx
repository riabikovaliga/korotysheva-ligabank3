import PropTypes from 'prop-types';
import React from 'react';
import {InfoSuccess} from '../info-block/info-block';
import {Modal} from '../modal/modal';

const SuccessModal = ({className, changeVisibilitySuccess}) => {
    return (
        <Modal closeModal={() => changeVisibilitySuccess(false)}>
            <InfoSuccess className={className}/>
        </Modal>
    );
};

SuccessModal.propTypes = {
    className: PropTypes.string.isRequired,
    changeVisibilitySuccess: PropTypes.func.isRequired
};

export {SuccessModal};

