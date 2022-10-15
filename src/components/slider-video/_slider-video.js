import Swiper, { Navigation, Pagination } from 'swiper';

const optionsVideo = {
  modules: [Navigation, Pagination],
  direction: 'horizontal',
  loop: true,
  slidesPerView: 3,

  breakpoints: {
    1440: {
      spaceBetween: 42
    },
    769: {
      slidesPerView: 3
    },
    421: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    200: {

    }
  },

  navigation: {
    nextEl: '.slider-video__button-next',
    prevEl: '.slider-video__button-prev',
  },

  pagination: {
    el: '.slider-video__pagination',
    clickable: true,
  },
};

export const sliderVideo = new Swiper('.slider-video', optionsVideo);