import { resetScale } from './scale.js';
import { resetEffects } from './slider.js';
import { isTextFieldFocused, resetValidation } from './validation.js';
import { sendPhoto } from './server.js';
import { showSuccess, showSubmitError, isMessageShown } from './messages.js';

// Поиск элементов и объявление переменных

const DEFAULT_PREVIEW_SRC = 'img/upload-default-image.jpg';
const uploadInput = document.querySelector('.img-upload__input'); //выбор файла,  change открывает форму
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const uploadSubmitButton = document.querySelector('.img-upload__submit');
const uploadPreviewImage = document.querySelector('.img-upload__preview img');// находим превью
const effectPreviews = document.querySelectorAll('.effects__preview');

let previewUrl = null;

// Функция открытия формы

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const showPreview = (file) => {
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }
  previewUrl = URL.createObjectURL(file);

  uploadPreviewImage.src = previewUrl;
  effectPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${previewUrl})`;
  });
};

//  возвращаем превью к изображению по умолчанию
const resetPreview = () => {
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
    previewUrl = null;
  }
  uploadPreviewImage.src = DEFAULT_PREVIEW_SRC;
  effectPreviews.forEach((preview) => {
    preview.style.backgroundImage = '';
  });
};


//Обработчик выбора файла

uploadInput.addEventListener('change', () => {
  const file = uploadInput.files[0];

  // Файла нет или это не картинка: форму не открываем
  if (!file || !file.type.startsWith('image/')) {
    uploadInput.value = '';
    return;
  }
  showPreview(file);
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
uploadCancelButton.addEventListener('click', (evt) => {
  evt.preventDefault();
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

  if (isMessageShown()) {
    return;
  }

  closeUploadForm();
});

// Сброс формы: все три части возвращаются в исходное состояние
uploadForm.addEventListener('reset', () => {
  resetPreview();
  resetScale();
  resetEffects();
  resetValidation();
});

//Блокировка кнопки на время запроса

const blockSubmitButton = () => {
  uploadSubmitButton.disabled = true;
};

const unblockSubmitButton = () => {
  uploadSubmitButton.disabled = false;
};

///  Отправка формы
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(uploadForm);

  blockSubmitButton();

  sendPhoto(formData)

    .then(() => {
      closeUploadForm();
      showSuccess();
    })

    .catch(() => {
      showSubmitError();
    })

    .finally(unblockSubmitButton);
});
