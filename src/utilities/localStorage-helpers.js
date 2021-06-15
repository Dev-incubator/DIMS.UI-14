export const setToLocalStorage = (key, object) => localStorage.setItem(key, JSON.stringify(object));
export const getFromLocalStorage = (object) => JSON.parse(localStorage.getItem(object));
