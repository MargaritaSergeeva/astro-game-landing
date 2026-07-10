import { initAboutGalleryLightbox } from './about-gallery-lightbox';
import { initAboutGallerySlider } from './about-gallery-slider';

const galleryLightbox = initAboutGalleryLightbox();

initAboutGallerySlider({
  onOpen: galleryLightbox.open,
});
