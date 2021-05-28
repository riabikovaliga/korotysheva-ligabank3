export const extend = (a, b) => Object.assign({}, a, b);

export const getWordForm = (n, array) => {
    const modN = n % 10;
    if (n > 10 && n < 21) {
        return array[2];
    } else if (modN > 1 && modN < 5) {
        return array[1];
    } else if (modN === 1) {
        return array[0];
    } else {
        return array[2];
    }
};

export const getValidValue = (value, min, max) => {
    let validValue = Number.parseFloat(value) || min;
    if (validValue < min) {
        validValue = min;
    } else if (validValue > max) {
        validValue = max;
    }
    return validValue;
};

export const getPercentOfCost = (percent, cost) => Math.ceil((percent * 100) / cost);
export const getCostOfPercent = (percent, cost) => Math.ceil((percent * cost) / 100);

export const getWordFormWithValue = (n, array) => n.toLocaleString() + ' ' + getWordForm(n, array);

export const range = (count) => {
   return [...Array(count).keys()];
};
