const getLanguageSwitchers = () => [
  ...document.querySelectorAll<HTMLDetailsElement>('.language-switcher'),
];

const closeLanguageSwitchers = (target?: EventTarget | null) => {
  getLanguageSwitchers().forEach((switcher) => {
    if (!switcher.open) {
      return;
    }

    if (!target || !(target instanceof Node) || !switcher.contains(target)) {
      switcher.open = false;
    }
  });
};

document.addEventListener(
  'pointerdown',
  (event) => {
    closeLanguageSwitchers(event.target);
  },
  { capture: true },
);

document.addEventListener('click', (event) => {
  closeLanguageSwitchers(event.target);
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') {
    return;
  }

  closeLanguageSwitchers();
});
