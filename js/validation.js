const hashtagsInput = document.querySelector('.text__hashtags');//поиск элемента хештега
const commentInput = document.querySelector('.text__description');
const uploadForm = document.querySelector('.img-upload__form');


// Функция разбивает строку на отдельные хэштеги по пробелам, пустые элементы отбрасываем
const getHashtags = (value) => value.trim().split(/\s+/).filter(Boolean);

//Хэштег начинается с символа # (решётка);

const hasValidCharacters = (value) =>
  getHashtags(value).every((tag) => /^#[a-zа-яё0-9]+$/i.test(tag));

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
const isLengthValid = (value) => getHashtags(value).every((tag) => tag.length <= 20);


//Нельзя указать больше пяти хэштегов

const isCountValid = (value) => getHashtags(value).length <= 5;


// Без повторов, регистр не учитываем (#ХэшТег и #хэштег одинаковы)
const isUnique = (value) => {
  const tags = getHashtags(value).map((tag) => tag.toLowerCase());
  return new Set(tags).size === tags.length;
};


//  Комментарий не длиннее 140 символов


const isCommentValid = (value) => value.length <= 140;


//Если фокус находится в поле ввода хэштега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.

const isTextFieldFocused = () => document.activeElement === hashtagsInput || document.activeElement === commentInput;

// Pristine

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  successClass: 'img-upload__field-wrapper--success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
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

// Убирает ошибки валидации; вызывается из forms.js при сбросе формы
const resetValidation = () => {
  pristine.reset();
};

export { isTextFieldFocused, resetValidation };
