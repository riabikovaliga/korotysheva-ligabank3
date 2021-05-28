import {Actions} from '../../const';

const initialState = {
    menuIsOpen: false,
    target: null,
    formLoginIsOpen: false,
    cost: 0,
    fee: 0,
    period: 1,
    useCapital: false,
    useInsurance: false,
    useComprehensiveCover: false,
    email: localStorage.getItem('login'),
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    data: {
        count: 1,
        email: localStorage.getItem('email'),
        phone: localStorage.getItem('phone'),
        name: localStorage.getItem('name')
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.CHANGE_VISIBILITY_MENU:
            return {
                ...state,
                menuIsOpen: action.payload
            };
        case Actions.CHANGE_VISIBILITY_FORM_LOGIN:
            return {
                ...state,
                formLoginIsOpen: action.payload
            };
        case Actions.CHANGE_TARGET:
            return {
                ...state,
                target: action.payload
            };
        case Actions.CHANGE_COST:
            return {
                ...state,
                cost: action.payload
            };
        case Actions.CHANGE_FEE:
            return {
                ...state,
                fee: action.payload
            };
        case Actions.CHANGE_PERIOD:
            return {
                ...state,
                period: action.payload
            };
        case Actions.CHANGE_USE_CAPITAL:
            return {
                ...state,
                useCapital: action.payload
            };
        case Actions.CHANGE_USE_COMPREHENSIVE_COVER:
            return {
                ...state,
                useComprehensiveCover: action.payload
            };
        case Actions.CHANGE_USE_INSURANCE:
            return {
                ...state,
                useInsurance: action.payload
            };
        case Actions.LOGIN:
            return {
                ...state,
                email: action.payload,
                isLoggedIn: true
            };
        case Actions.LOGOUT:
            return {
                ...state,
                isLoggedIn: false
            };
        case Actions.SAVE_DATA:
            return {
                ...state,
                data: {...state.data, ...action.payload}
            };
        case Actions.DELETE_DATA:
            return {
                ...state,
                data: { count: state.data.count, email: state.data.email, phone: state.data.phone, name: state.data.name}
            };
        default:
            return state;
    }
};

export default reducer;
