import Swiper, { Autoplay, Navigation, Pagination } from 'swiper';

const optionsMain = {
  modules: [Autoplay, Navigation, Pagination],
  direction: 'horizontal',
  loop: true,
  grabCursor: true,
  autoplay: {
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  navigation: {
    nextEl: '.slider-main__button-next',
    prevEl: '.slider-main__button-prev',
  },

  pagination: {
    el: '.slider-main__pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.slider-main__button-next',
    prevEl: '.slider-main__button-prev',
  },
}

class SliderMain {
  constructor(sliderEl, options) {
    this.slider = new Swiper(sliderEl, options);

    this.renderFraction(this.slider.slides.length - 2);

    this.slider.on('slideChange', (swiper) => {
      const curActiveSlide = swiper.realIndex + 1;
      const totalSlides = swiper.slides.length - 2;

      this.setFraction(curActiveSlide, totalSlides);
    });
  }

  renderFraction(totalSlides) {
    const el = document.createElement('p');
    el.classList.add('slider-main__fraction');
    el.textContent = `01 | 0${totalSlides}`
    const pagination = document.querySelector('.slider-main__pagination');

    pagination.append(el);
  }

  setFraction(curActiveSlide, totalSlides) {
    const fractionEl = document.querySelector('.slider-main__fraction');
    fractionEl.textContent = `0${curActiveSlide} | 0${totalSlides}`;
  }
};

export const sliderMain = new SliderMain('.slider-main', optionsMain);