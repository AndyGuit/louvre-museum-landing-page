class Gallery {
  constructor(picContainer, numOfImages) {
    this.container = document.querySelector(picContainer);
    this.imgArrSrc = Array.from({ length: numOfImages }, (_, i) => {
      return `./img/gallery/gallery${i + 1}.jpg`
    });

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
    const isVisible = entry.isIntersecting;

    isVisible ? this.generateRandomImages() : null;
  }

  generateRandomImages = () => {
    this.container.innerHTML = '';

    this.imgArrSrc.sort(() => Math.random() - 0.5);

    this.imgArrSrc.forEach(pic => {
      const div = document.createElement('div');
      div.classList.add('gallery__picture');

      const img = document.createElement('img');
      img.src = pic;
      img.alt = pic;
      this.container.append(div);
      div.append(img);

      this.observeElement(div);
    })
  }
}

export const gallery = new Gallery('.gallery__pictures', 15);