import { Swiper } from 'swiper';
import { A11y, Keyboard, Pagination } from 'swiper/modules';

interface GallerySliderOptions {
  onOpen: (slideIndex: number) => void;
}

const getMotionSafeSpeed = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300;

const updateGalleryCounter = (counter: HTMLElement | null, swiper: Swiper) => {
  if (!counter) {
    return;
  }

  counter.textContent = `${String(swiper.activeIndex + 1).padStart(2, '0')} / ${String(swiper.slides.length).padStart(2, '0')}`;
};

export const initAboutGallerySlider = ({ onOpen }: GallerySliderOptions) => {
  const galleryElement = document.querySelector<HTMLElement>('[data-gallery-slider]');
  const galleryPagination = document.querySelector<HTMLElement>('[data-gallery-pagination]');
  const galleryCounter = document.querySelector<HTMLElement>('[data-gallery-counter]');

  if (!galleryElement) {
    return;
  }

  const gallery = new Swiper(galleryElement, {
    modules: [A11y, Keyboard, Pagination],
    a11y: { enabled: true },
    keyboard: { enabled: true, onlyInViewport: true },
    loop: false,
    speed: getMotionSafeSpeed(),
    pagination: {
      el: galleryPagination,
      clickable: true,
    },
    on: {
      slideChange(swiper) {
        updateGalleryCounter(galleryCounter, swiper);
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

  galleryElement.querySelectorAll<HTMLButtonElement>('[data-gallery-open]').forEach((button) => {
    button.addEventListener('click', () => {
      onOpen(Number(button.dataset.galleryIndex ?? 0));
    });
  });
};
