const debounce = (func, wait) => {
  let timeOut;

  return (...args) => {
    clearTimeout(timeOut);

    timeOut = setTimeout(() => {
      func.apply(null, args);
    }, wait);
  };
};

export default debounce;
