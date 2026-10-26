const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const uploadForm = document.querySelector('.img-upload__form');


const getHashtags = (value) => value.trim().split(/\s+/).filter(Boolean);


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


const isLengthValid = (value) => getHashtags(value).every((tag) => tag.length <= MAX_HASHTAG_LENGTH);


const isCountValid = (value) => getHashtags(value).length <= MAX_HASHTAGS_COUNT;


const isUnique = (value) => {
  const tags = getHashtags(value).map((tag) => tag.toLowerCase());
  return new Set(tags).size === tags.length;
};


const isCommentValid = (value) => value.length <= MAX_COMMENT_LENGTH;


const isTextFieldFocused = () => document.activeElement === hashtagsInput || document.activeElement === commentInput;


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

const validateForm = () => pristine.validate();


const resetValidation = () => {
  pristine.reset();
};

export { isTextFieldFocused, resetValidation, validateForm };
