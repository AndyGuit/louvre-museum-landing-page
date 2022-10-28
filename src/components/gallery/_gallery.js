class Gallery {
  constructor(picContainer, numOfImages) {
    this.container = document.querySelector(picContainer);
    this.imgArrSrc = Array.from({ length: numOfImages }, (_, i) => {
      return `./img/gallery/gallery${i + 1}.jpg`
    });

    this.generatePictureColumns();
    this.observeSection();
  }

  observeElement = (element) => {
    const observer = new IntersectionObserver(this.slideInOnScroll, {
      root: null,
      threshold: 0.10,
    });

    observer.observe(element);
  }

  slideInOnScroll = ([entry]) => {
    const isVisible = entry.isIntersecting;
    const targetImg = entry.target;

    isVisible ? targetImg.classList.add('active') : targetImg.classList.remove('active');
  }

  observeSection = () => {
    const section = this.container.closest('section');
    const observer = new IntersectionObserver(this.generateGalleryOnScroll, {
      root: null,
      threshold: 0.01,
    });

    observer.observe(section);
  }

  generateGalleryOnScroll = ([entry]) => {
    this.container.innerHTML = '';
    this.generatePictureColumns();

    const isVisible = entry.isIntersecting;

    isVisible ? this.generateRandomImages() : null;
  }

  generatePictureColumns = () => {
    for (let i = 0; i < 3; i++) {
      const div = document.createElement('div');
      div.classList.add(`gallery__picture-col--${i}`);
      this.container.append(div);
    }
  }

  generateRandomImages = () => {
    this.imgArrSrc.sort(() => Math.random() - 0.5);

    this.imgArrSrc.forEach((pic, i) => {
      const div = document.createElement('div');
      div.classList.add('gallery__picture');

      const img = document.createElement('img');
      img.src = pic;
      img.alt = pic;

      const colEl = this.container.querySelector(`.gallery__picture-col--${i % 3}`);
      colEl.append(div);
      div.append(img);

      this.observeElement(div);
    })
  }
}

export const gallery = new Gallery('.gallery__pictures', 15);