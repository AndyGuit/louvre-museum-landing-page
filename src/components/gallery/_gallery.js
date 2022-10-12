class Gallery {
  constructor(picContainer, numOfImages) {
    this.container = document.querySelector(picContainer);
    this.imgArrSrc = Array.from({ length: numOfImages }, (_, i) => {
      return `./img/gallery/gallery${i + 1}.jpg`
    });

    this.generateRandomImages();
  }

  generateRandomImages() {
    this.imgArrSrc.sort(() => Math.random() - 0.5);

    this.imgArrSrc.forEach(pic => {
      const div = document.createElement('div');
      div.classList.add('gallery__picture');

      const img = document.createElement('img');
      img.src = pic;
      img.alt = pic;
      this.container.append(div);
      div.append(img);
    })
  }
}

export const gallery = new Gallery('.gallery__pictures', 15);