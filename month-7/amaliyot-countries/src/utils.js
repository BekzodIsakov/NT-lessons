export const saveToLocalStorage = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const getFromLocalStorage = (name) => {
  return JSON.parse(localStorage.getItem(name));
};
