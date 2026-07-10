import { Swiper } from 'swiper';
import { A11y, Keyboard, Navigation } from 'swiper/modules';

const getMotionSafeSpeed = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300;

const stopGalleryModalScroll = (event: Event) => {
  event.preventDefault();
  event.stopPropagation();
};

export const initAboutGalleryLightbox = () => {
  const galleryModal = document.querySelector<HTMLDialogElement>('[data-gallery-modal]');
  const galleryModalClose = document.querySelector<HTMLButtonElement>('[data-gallery-modal-close]');
  const galleryModalSlider = document.querySelector<HTMLElement>('[data-gallery-modal-slider]');
  const galleryModalPrev = document.querySelector<HTMLButtonElement>('[data-gallery-modal-prev]');
  const galleryModalNext = document.querySelector<HTMLButtonElement>('[data-gallery-modal-next]');
  const mobileMediaQuery = window.matchMedia('(max-width: 767px)');
  let modalGallery: Swiper | null = null;

  const getGalleryImageSrc = (image: HTMLImageElement) => {
    if (mobileMediaQuery.matches) {
      return image.dataset.galleryMobileSrc;
    }

    return image.dataset.galleryLargeSrc;
  };

  const loadLargeSlide = (slide: Element | undefined) => {
    const image = slide?.querySelector<HTMLImageElement>('[data-gallery-modal-image]');
    const imageSrc = image ? getGalleryImageSrc(image) : undefined;

    if (!image || !imageSrc || image.getAttribute('src') === imageSrc) {
      return;
    }

    image.src = imageSrc;
  };

  const loadVisibleLargeSlides = (swiper: Swiper) => {
    const activeSlide = swiper.slides[swiper.activeIndex];

    loadLargeSlide(activeSlide);
    loadLargeSlide(activeSlide?.previousElementSibling ?? swiper.slides.at(-1));
    loadLargeSlide(activeSlide?.nextElementSibling ?? swiper.slides[0]);
  };

  const getModalGallery = () => {
    if (modalGallery || !galleryModalSlider) {
      return modalGallery;
    }

    modalGallery = new Swiper(galleryModalSlider, {
      modules: [A11y, Keyboard, Navigation],
      a11y: { enabled: true },
      keyboard: { enabled: true, onlyInViewport: true },
      loop: true,
      speed: getMotionSafeSpeed(),
      navigation: {
        prevEl: galleryModalPrev,
        nextEl: galleryModalNext,
      },
      on: {
        init(swiper) {
          loadVisibleLargeSlides(swiper);
        },
        slideChange(swiper) {
          loadVisibleLargeSlides(swiper);
        },
      },
    });

    return modalGallery;
  };

  galleryModalClose?.addEventListener('click', () => {
    galleryModal?.close();
  });

  galleryModal?.addEventListener('click', (event) => {
    event.stopPropagation();

    if (event.target === galleryModal) {
      galleryModal.close();
    }
  });

  galleryModal?.addEventListener('close', () => {
    document.body.dataset.galleryModalOpen = 'false';
  });

  mobileMediaQuery.addEventListener('change', () => {
    if (modalGallery && galleryModal?.open) {
      loadVisibleLargeSlides(modalGallery);
    }
  });

  galleryModal?.addEventListener('wheel', stopGalleryModalScroll, {
    passive: false,
    capture: true,
  });
  galleryModal?.addEventListener('touchmove', stopGalleryModalScroll, {
    passive: false,
    capture: true,
  });

  return {
    open(slideIndex: number) {
      if (!galleryModal) {
        return;
      }

      document.body.dataset.galleryModalOpen = 'true';
      galleryModal.showModal();
      galleryModalNext?.focus();
      const modalGallerySlider = getModalGallery();

      if (modalGallerySlider) {
        modalGallerySlider.slideToLoop(slideIndex, 0);
        loadVisibleLargeSlides(modalGallerySlider);
      }
    },
  };
};
