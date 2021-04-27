export default function debounce(fn, delay) {
  let timer = null;
  return function (...rest) {
    const context = this;
    const args = rest;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
