export const $ = (selector) => {
  const els = document.querySelectorAll(selector);
  if (els.length > 1) {
    return els;
  } else if (els.length === 1) {
    return els[0];
  }
};
