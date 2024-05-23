import blockPageScroll, { containCls, getChild } from '../helpers/helpers';

const HEADER_SELECTOR = '.js-header';
const BURGER_SELECTOR = '.js-burger';
const CLOSE_MENU_CLASS = 'js-close-menu';
const CSS_CLASSES = {
  activeBurger: 'burger--active',
  acativeHeader: 'header--active',
};

const headerEl = document.querySelector(HEADER_SELECTOR);
const burgerEl = getChild(headerEl, BURGER_SELECTOR);

let isScroll = false;

// header mobile menu

const toggleMenu = () => {
  headerEl.classList.toggle(CSS_CLASSES.acativeHeader);
  burgerEl.classList.toggle(CSS_CLASSES.activeBurger);

  isScroll = !isScroll;

  blockPageScroll(isScroll);
};

const closeMenu = (e) => {
  const { target } = e;

  if (containCls(target, CLOSE_MENU_CLASS)) {
    isScroll = false;
    blockPageScroll(isScroll);

    headerEl.classList.remove(CSS_CLASSES.acativeHeader);
    burgerEl.classList.remove(CSS_CLASSES.activeBurger);
  }
};

const goHeader = () => {
  if (!headerEl) return;

  burgerEl.addEventListener('click', toggleMenu);
  headerEl.addEventListener('click', closeMenu);
};

export default goHeader;
