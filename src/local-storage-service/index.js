export const saveStatusIsLoggedInToLocalStorage = (value) => {
    localStorage.setItem('isLoggedIn', value);
};

export const saveLoginToLocalStorage = ({email, password}) => {
    localStorage.setItem('login', email);
    localStorage.setItem('password', password);
    saveStatusIsLoggedInToLocalStorage(true);
};

export const saveUserDataToLocalStorage = ({email, phone, name}) => {
    localStorage.setItem('email', email);
    localStorage.setItem('phone', phone);
    localStorage.setItem('name', name);
};
