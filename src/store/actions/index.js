import {Actions} from '../../const';

export const changeVisibilityMenu = (payload) => ({
    type: Actions.CHANGE_VISIBILITY_MENU,
    payload: payload
});

export const changeVisibilityFormLogin = (payload) => ({
    type: Actions.CHANGE_VISIBILITY_FORM_LOGIN,
    payload: payload
});

export const changeTarget = (payload) => ({
    type: Actions.CHANGE_TARGET,
    payload: payload
});

export const changeCost = (payload) => ({
    type: Actions.CHANGE_COST,
    payload: payload
});

export const changeFee = (payload) => ({
    type: Actions.CHANGE_FEE,
    payload: payload
});

export const changePeriod = (payload) => ({
    type: Actions.CHANGE_PERIOD,
    payload: payload
});

export const changeUseCapital = (payload) => ({
    type: Actions.CHANGE_USE_CAPITAL,
    payload: payload
});

export const changeUseComprehensiveCover = (payload) => ({
    type: Actions.CHANGE_USE_COMPREHENSIVE_COVER,
    payload: payload
});

export const changeUseInsurance = (payload) => ({
    type: Actions.CHANGE_USE_INSURANCE,
    payload: payload
});

export const login = (payload) => ({
    type: Actions.LOGIN,
    payload: payload
});

export const logout = () => ({
    type: Actions.LOGOUT
});

export const saveData = (payload) => ({
    type: Actions.SAVE_DATA,
    payload: payload
});

export const deleteData = () => ({
    type: Actions.DELETE_DATA,
});
