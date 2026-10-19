import { resetScale } from './scale.js';
import { resetEffects } from './slider.js';
import { isTextFieldFocused, resetValidation } from './validation.js';

// Поиск элементов и объявление переменных

const uploadInput = document.querySelector('.img-upload__input'); //выбор файла,  change открывает форму
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const uploadCancelButton = document.querySelector('.img-upload__cancel');

// Функция открытия формы

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

//Обработчик выбора файла

uploadInput.addEventListener('change', () => {
  const file = uploadInput.files[0];

  // Файла нет или это не картинка: форму не открываем
  if (!file || !file.type.startsWith('image/')) {
    uploadInput.value = '';
    return;
  }

  openUploadForm();
});

// Закрытие формы (1.3 ТЗ)

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  uploadInput.value = '';
};

// Кнопка «Закрыть»
uploadCancelButton.addEventListener('click', () => {
  closeUploadForm();
});

document.addEventListener('keydown', (evt) => {
  if (evt.key !== 'Escape') {
    return;
  }

  if (uploadOverlay.classList.contains('hidden')) {
    return;
  }

  if (isTextFieldFocused()) {
    return;
  }

  closeUploadForm();
});

// Сброс формы: все три части возвращаются в исходное состояние
uploadForm.addEventListener('reset', () => {
  resetScale();
  resetEffects();
  resetValidation();
});
