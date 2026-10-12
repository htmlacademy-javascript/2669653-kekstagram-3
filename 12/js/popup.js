// Модулья открытия и закрытия

// Создание переменных (поиск)
const bigPicture = document.querySelector('.big-picture'); // поиск главного блока внутри документа
const bigPictureImg = bigPicture.querySelector('.big-picture__img img'); // картинка внутри окна
const likesCount = bigPicture.querySelector('.likes-count'); // блок с количеством лайков
const socialCaption = bigPicture.querySelector('.social__caption'); // описание фотографии
const socialComments = bigPicture.querySelector('.social__comments'); // список комментариев класса ul
const socialCommentsCount = bigPicture.querySelector('.social__comment-count'); // счетчик с классом тегом (надо скрыть)
const loaderComments = bigPicture.querySelector('.comments-loader'); // загрузка новых комментариев (надо скрыть)
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count'); // показанные комментарии
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count'); // общее число комментариев
const pictureCloseButton = bigPicture.querySelector('.big-picture__cancel'); // кнопка закрытия
const commentSample = socialComments.querySelector('.social__comment'); // образец комментария


// Создаёт один комментарий: клонирует образец и наполняет его данными
const createComment = (comment) => {
  const commentItem = commentSample.cloneNode(true);
  const commentAvatar = commentItem.querySelector('.social__picture');
  const commentText = commentItem.querySelector('.social__text');

  commentAvatar.src = comment.avatar;
  commentAvatar.alt = comment.name;
  commentText.textContent = comment.message;

  return commentItem;
};

// Полностью перерисовывает список комментариев
const renderComments = (comments) => {
  socialComments.innerHTML = '';

  const commentsFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    commentsFragment.append(createComment(comment));
  });

  socialComments.append(commentsFragment);
};

// Функция Заполняет окно данными конкретной фотографии
const fillBigPicture = function (photo) {
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;
  commentShownCount.textContent = photo.comments.length;
  commentTotalCount.textContent = photo.comments.length;

  socialCommentsCount.classList.add('hidden');
  loaderComments.classList.add('hidden');

  renderComments(photo.comments);
};

// Обработчик ESC


const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
};

// Открытие и закрытие

const openBigPicture = function (photo) {
  fillBigPicture(photo);
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};


// Кнопка крестика
pictureCloseButton.addEventListener('click', () => {
  closeBigPicture();
});

export { openBigPicture };
