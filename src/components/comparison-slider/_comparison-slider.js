// const comaprisonSlider = document.querySelector('.comparison-slider__slider input');
// const sliderLine = document.querySelector('.comparison-slider__slider-line');
// const pictureAfter = document.querySelector('.comparison-slider__pictures .picture-after');

// comaprisonSlider.oninput = () => {
//   let value = comaprisonSlider.value;
//   sliderLine.style.left = `${value}%`;
//   pictureAfter.style.width = `${value}%`;
// };

class ComparisonSlider {
  constructor(sliderInput, sliderLine, pictureAfter) {
    this.input = document.querySelector(sliderInput);
    this.line = document.querySelector(sliderLine);
    this.picAfter = document.querySelector(pictureAfter);

    this.slide();
  }

  slide() {
    this.input.addEventListener('input', () => {
      let value = this.input.value;
      this.line.style.left = `${value}%`;
      this.picAfter.style.width = `${value}%`;
    })
  }
}

export const comaprisonSlider = new ComparisonSlider(
  '.comparison-slider__slider input',
  '.comparison-slider__slider-line',
  '.comparison-slider__pictures .picture-after'
)