const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleValueInput = document.querySelector('.scale__control--value');
const previewImg = document.querySelector('.img-upload__preview img');
let currentScale = SCALE_MAX;


const applyScale = (value) => {
  currentScale = value;
  scaleValueInput.value = `${value}%`;
  previewImg.style.transform = `scale(${value / 100})`;
};


const changeScale = (factor) => {
  const newScale = Math.min(
    Math.max(currentScale + SCALE_STEP * factor, SCALE_MIN), SCALE_MAX);

  applyScale(newScale);
};


const resetScale = () => {
  applyScale(SCALE_MAX);
};

//Кнопки
scaleSmallerButton.addEventListener('click', () => changeScale(-1));
scaleBiggerButton.addEventListener('click', () => changeScale(1));

export { resetScale };
