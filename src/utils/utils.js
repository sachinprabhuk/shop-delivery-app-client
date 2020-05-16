export const firstLetterToUpperCase = (str) => {
    if (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return str;
};
