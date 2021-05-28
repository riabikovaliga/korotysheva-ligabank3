import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './store/reducers';
import ReactDOM from 'react-dom';

import './index.scss';

import App from './components/app/app';

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
