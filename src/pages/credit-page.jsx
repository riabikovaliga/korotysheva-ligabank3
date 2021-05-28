import React from 'react';
import {useSelector} from 'react-redux';
import {Credit} from '../components/credit/credit';
import {FormLogin} from '../components/form-login/form-login';
import {Header} from '../components/header/header';
import {Footer} from '../components/footer/footer';

const CreditPage = () => {
    const formLoginIsOpen = useSelector(state => state.formLoginIsOpen);

    return (
        <React.Fragment>
            <Header/>
            {formLoginIsOpen && <FormLogin/>}
            <Credit/>
            <Footer/>
        </React.Fragment>
    );
};

export {CreditPage};
