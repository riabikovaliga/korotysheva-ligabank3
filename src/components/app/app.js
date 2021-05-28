import React from 'react';
import {Redirect, Switch, Route, BrowserRouter} from 'react-router-dom';
import {CreditPage} from '../../pages/credit-page';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={'/'} component={CreditPage}/>
                <Redirect to={'/'}/>
            </Switch>
        </BrowserRouter>
    );
};

export default App;
