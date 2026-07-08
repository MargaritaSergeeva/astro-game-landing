import { Swiper } from 'swiper';
import { A11y, Keyboard, Pagination } from 'swiper/modules';

const galleryElement = document.querySelector<HTMLElement>('[data-gallery-slider]');
const galleryPagination = document.querySelector<HTMLElement>('[data-gallery-pagination]');
const galleryCounter = document.querySelector<HTMLElement>('[data-gallery-counter]');

if (galleryElement) {
  const gallery = new Swiper(galleryElement, {
    modules: [A11y, Keyboard, Pagination],
    a11y: { enabled: true },
    keyboard: { enabled: true, onlyInViewport: true },
    loop: false,
    speed: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300,
    pagination: {
      el: galleryPagination,
      clickable: true,
    },
    on: {
      slideChange(swiper) {
        if (galleryCounter) {
          galleryCounter.textContent = `${String(swiper.activeIndex + 1).padStart(2, '0')} / ${String(swiper.slides.length).padStart(2, '0')}`;
        }
      },
    },
  });

  galleryElement.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      event.stopPropagation();
      gallery.slideNext();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      event.stopPropagation();
      gallery.slidePrev();
    }
  });
}
