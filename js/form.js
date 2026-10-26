import { resetScale } from './scale.js';
import { resetEffects } from './slider.js';
import { isTextFieldFocused, resetValidation, validateForm } from './validation.js';
import { sendPhoto } from './server.js';
import { showSuccess, showSubmitError, isMessageShown } from './messages.js';


const DEFAULT_PREVIEW_SRC = 'img/upload-default-image.jpg';
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const uploadSubmitButton = document.querySelector('.img-upload__submit');
const uploadPreviewImage = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');

let previewUrl = null;


const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
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


uploadInput.addEventListener('change', () => {
  const file = uploadInput.files[0];


  if (!file || !file.type.startsWith('image/')) {
    uploadInput.value = '';
    return;
  }
  showPreview(file);
  openUploadForm();
});


const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  uploadInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
};


uploadCancelButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeUploadForm();
});

function onDocumentKeydown(evt) {
  if (evt.key !== 'Escape') {
    return;
  }

  if (isTextFieldFocused()) {
    return;
  }

  if (isMessageShown()) {
    return;
  }

  closeUploadForm();
}


uploadForm.addEventListener('reset', () => {
  resetPreview();
  resetScale();
  resetEffects();
  resetValidation();
});


const blockSubmitButton = () => {
  uploadSubmitButton.disabled = true;
};

const unblockSubmitButton = () => {
  uploadSubmitButton.disabled = false;
};


uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!validateForm()) {
    showSubmitError();
    return;
  }
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
