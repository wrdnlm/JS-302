class Slider {
  /**
   * 
   * @param {HTMLElement} slider
   */
  constructor(slider) {
    if (!slider) throw new Error('No slider selected!');
    this.slider = slider;
    this.currentSlide = '';
    this.prevSlide = '';
    this.nextSlide = '';
    this.init();
  }

  init = () => {
    let { slider, handleSlideMovement } = this;
    let slides = [...slider.querySelectorAll('.slide')];
    let btnPrev = slider.querySelector('.goToPrev');
    let btnNext = slider.querySelector('.goToNext');
    this.currentSlide = slider.querySelector('.current') || slides[0];
    this.prevSlide = this.currentSlide.previousElementSibling || slides[0];
    this.nextSlide = this.currentSlide.nextElementSibling || slides[slides.length - 1];

    btnPrev.addEventListener('click', () => handleSlideMovement('prev', slides));
    btnNext.addEventListener('click', () => handleSlideMovement('next', slides));
    this.applyClasses();
  }

  handleSlideMovement = (direction, slides) => {
    if (direction === 'prev') {
      this.prevSlide.classList.remove('prev', 'current', 'next');
      this.currentSlide.classList.remove('prev', 'current', 'next');
      this.nextSlide.classList.remove('prev', 'current', 'next');

      this.currentSlide = this.prevSlide;
      this.prevSlide = this.currentSlide.previousElementSibling || slides[slides.length - 1];
      this.nextSlide = this.currentSlide.nextElementSibling || slides[0];
      this.applyClasses();
    } else if (direction === 'next') {
      this.prevSlide.classList.remove('prev', 'current', 'next');
      this.currentSlide.classList.remove('prev', 'current', 'next');
      this.nextSlide.classList.remove('prev', 'current', 'next');

      this.currentSlide = this.nextSlide;
      this.prevSlide = this.currentSlide.previousElementSibling || slides[slides.length - 1];
      this.nextSlide = this.currentSlide.nextElementSibling || slides[0];
      this.applyClasses();
    }
  }

  applyClasses = () => {
    this.prevSlide.classList.add('prev');
    this.currentSlide.classList.add('current');
    this.nextSlide.classList.add('next');
  }
}

const slider = new Slider(document.querySelector('.slider'));
const dogSlider = new Slider(document.querySelector('.dog-slider'));