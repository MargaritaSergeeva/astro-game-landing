const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
const openButton = document.querySelector<HTMLButtonElement>('[data-menu-open]');
const closeButton = document.querySelector<HTMLButtonElement>('[data-menu-close]');
let previouslyFocused: HTMLElement | null = null;

const focusableSelector =
  'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

const closeMenu = () => {
  if (!menu || !openButton) {
    return;
  }
  menu.hidden = true;
  openButton.setAttribute('aria-expanded', 'false');
  document.body.dataset.menuOpen = 'false';
  previouslyFocused?.focus();
};

const openMenu = () => {
  if (!menu || !openButton) {
    return;
  }
  previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  menu.hidden = false;
  openButton.setAttribute('aria-expanded', 'true');
  document.body.dataset.menuOpen = 'true';
  closeButton?.focus();
};

openButton?.addEventListener('click', openMenu);
closeButton?.addEventListener('click', closeMenu);
menu?.querySelectorAll<HTMLAnchorElement>('[data-section-link]').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (!menu || menu.hidden) {
    return;
  }
  if (event.key === 'Escape') {
    closeMenu();
    return;
  }
  if (event.key !== 'Tab') {
    return;
  }

  const focusable = [...menu.querySelectorAll<HTMLElement>(focusableSelector)];
  const first = focusable[0];
  const last = focusable.at(-1);
  if (!first || !last) {
    return;
  }

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
