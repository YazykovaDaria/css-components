export const containCls = (el, cls) => el.classList.contains(cls);

export const getChild = (parentEl, selector) =>
  parentEl ? parentEl.querySelector(selector) : null;

export const createEl = (tag, cls, attr, content) => {
  const el = document.createElement(tag);
  if (cls) {
    el.classList.add(...cls);
  }
  if (attr) {
    el.setAttribute(attr.name, attr.value);
  }
  if (content) {
    el.textContent = content;
  }
  return el;
};

const blockPageScroll = (isBlock = true) => {
  const htmlElement = document.documentElement;
  if (isBlock) {
    htmlElement.style.overflow = 'hidden';
  } else {
    htmlElement.style.overflow = 'auto';
  }
};

export default blockPageScroll;
