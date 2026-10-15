
// Поиск элементов и объявление переменных
const SCALE_STEP = 25; //  изменения масштаба
const SCALE_MIN = 25; // минимальный масштаб
const SCALE_MAX = 100; // максимальный масштаб
const uploadInput = document.querySelector('.img-upload__input'); //выбор файла,  change открывает форму
const uploadOverlay = document.querySelector('.img-upload__overlay');
const previewImg = document.querySelector('.img-upload__preview img');
const scaleSmallerButton = document.querySelector('.scale__control--smaller'); //кнопка уменьшения
const scaleBiggerButton = document.querySelector('.scale__control--bigger'); //кнопка увеличения
const scaleValueInput = document.querySelector('.scale__control--value'); // значение масштаба
// Элементы закрытия формы
const uploadForm = document.querySelector('.img-upload__form');
const uploadCancelButton = document.querySelector('.img-upload__cancel');

// Состояние масштаба изображение

let currentScale = SCALE_MAX; //  масштаб по умолчанию

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


// Валидация хештегов

//Поиск элемента
const hashtagsInput = document.querySelector('.text__hashtags');

// Функция разбивает строку на отдельные хэштеги по пробелам, пустые элементы отбрасываем
const getHashtags = (value) => value.trim().split(/\s+/).filter(Boolean);

//Хэштег начинается с символа # (решётка);

const hasValidCharacters = (value) => {
  const tags = getHashtags(value);
  for (const tag of tags) {
    if (!/^#[a-zа-яё0-9]+$/i.test(tag)) {
      return false;
    }
  }
  return true;
};

//хэштег не может состоять только из решётки

const isNotOnlyHash = (value) => {
  const tags = getHashtags(value);
  for (const tag of tags) {
    if (tag === '#') {
      return false;
    }
  }
  return true;
};


// Длина каждого хэштега, включая решётку, не больше 20 символов
const isLengthValid = (value) => {
  const tags = getHashtags(value);
  for (const tag of tags) {
    if (tag.length > 20) {
      return false;
    }
  }
  return true;
};


//Нельзя указать больше пяти хэштегов

const isCountValid = (value) => getHashtags(value).length <= 5;


// Без повторов, регистр не учитываем (#ХэшТег и #хэштег одинаковы)
const isUnique = (value) => {
  const tags = getHashtags(value).map((tag) => tag.toLowerCase());
  return new Set(tags).size === tags.length;
};

//Если фокус находится в поле ввода хэштега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.

const isTextFieldFocused = () => document.activeElement === hashtagsInput || document.activeElement === commentInput;

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

// Валидация комментариев

const commentInput = document.querySelector('.text__description');
const isCommentValid = (value) => value.length <= 140;


// Pristine

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'pristine-error',
});

pristine.addValidator(hashtagsInput, isNotOnlyHash, 'Хэштег не может состоять из одной решётки');
pristine.addValidator(hashtagsInput, hasValidCharacters, 'Хэштег должен начинаться с # и содержать только буквы и цифры');
pristine.addValidator(hashtagsInput, isLengthValid, 'Максимальная длина хэштега 20 символов');
pristine.addValidator(hashtagsInput, isCountValid, 'Нельзя указать больше пяти хэштегов');
pristine.addValidator(hashtagsInput, isUnique, 'Один и тот же хэштег нельзя использовать дважды');
pristine.addValidator(commentInput, isCommentValid, 'Комментарий не может быть длиннее 140 символов');

uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
