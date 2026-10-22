const SCALE_STEP = 25; //  изменения масштаба
const SCALE_MIN = 25; // минимальный масштаб
const SCALE_MAX = 100; // максимальный масштаб
const scaleSmallerButton = document.querySelector('.scale__control--smaller'); //кнопка уменьшения
const scaleBiggerButton = document.querySelector('.scale__control--bigger'); //кнопка увеличения
const scaleValueInput = document.querySelector('.scale__control--value'); // значение масштаба
const previewImg = document.querySelector('.img-upload__preview img');
let currentScale = SCALE_MAX; //  масштаб по умолчанию

// Функция применения масштаба
const applyScale = (value) => {
  currentScale = value;
  scaleValueInput.value = `${value}%`;
  previewImg.style.transform = `scale(${value / 100})`;
};

//   Клик по кнопкам: шаг и границы
const changeScale = (factor) => {
  const newScale = Math.min(
    Math.max(currentScale + SCALE_STEP * factor, SCALE_MIN), SCALE_MAX);

  applyScale(newScale);
};

//Функция сбросе формы
const resetScale = () => {
  applyScale(SCALE_MAX);
};

//Кнопки
scaleSmallerButton.addEventListener('click', () => changeScale(-1));
scaleBiggerButton.addEventListener('click', () => changeScale(1));

export { resetScale };
