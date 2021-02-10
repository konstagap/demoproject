const slidesTrack = document.querySelector('.slider__inner');
const slides = document.querySelectorAll('.slider__item');
const dots = document.querySelectorAll('.slider__dot');
const prev = document.querySelector('.slider__arrow-left');
const next = document.querySelector('.slider__arrow-right');
const itemsCount = slides.length;
let currentIndex = 0;

const checkButtons = () => {
  next.disabled = currentIndex + 1 >= itemsCount;
  prev.disabled = currentIndex < 1;
};

const checkDots = () => {
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove('slider__dot--active');
  }
  dots[currentIndex].classList.add('slider__dot--active');
};

const checkSlideTrack = () => {
  const slideWidth = slides[1].clientWidth;
  const marginRight = 20;
  slidesTrack.style.transform = `translateX(-${
    (slideWidth + marginRight) * currentIndex
  }px)`;
  if (currentIndex + 1 < itemsCount) {
    slides[currentIndex + 1].classList.add('slider__item--gradient');
  }
  slides[currentIndex].classList.remove('slider__item--gradient');
};

next.addEventListener('click', () => {
  currentIndex += 1;
  checkSlideTrack();
  checkDots();
  checkButtons();
});

prev.addEventListener('click', () => {
  currentIndex -= 1;
  checkSlideTrack();
  checkDots();
  checkButtons();
});

dots.forEach((dot, dotIndex) => {
  dot.addEventListener('click', () => {
    currentIndex = dotIndex;
    checkSlideTrack();
    checkDots();
    checkButtons();
  });
});

// innitial state
slides[currentIndex + 1].classList.add('slider__item--gradient');
dots[currentIndex].classList.add('slider__dot--active');
checkButtons();

// toggle menu button
const menuBtn = document.getElementById('menu');
const nav = document.getElementById('navbar');
const body = document.querySelector('body');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('burger--active');
  nav.classList.toggle('nav--active');
  body.classList.toggle('noscroll');
});
