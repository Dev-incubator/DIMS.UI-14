export default function debounce(fn, delay) {
  let timer = null;

  return (...rest) => {
    const context = this;
    const args = rest;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
