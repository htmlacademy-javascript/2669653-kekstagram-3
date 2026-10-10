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


// Функция, которая наполняет фото содержимым
const fillBigPicture = function (photo) {
  bigPictureImg.src = photo.url; // ссылка на картинку
  bigPictureImg.alt = photo.description; // текст-описание картинки
  likesCount.textContent = photo.likes; // число лайков в текстовом содержании
  socialCaption.textContent = photo.description; // описание картинки
  commentShownCount.textContent = photo.comments.length;
  commentTotalCount.textContent = photo.comments.length;

  socialCommentsCount.classList.add('hidden'); //скрываем
  loaderComments.classList.add('hidden'); //скрываем

  socialComments.innerHTML = ''; // очистка списка комментариев

  // перебираем массив комментариев
  const commentsFragment = document.createDocumentFragment();
  photo.comments.forEach((comment) => {
    const commentItem = commentSample.cloneNode(true);
    const commentAvatar = commentItem.querySelector('.social__picture');
    const commentText = commentItem.querySelector('.social__text');

    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentText.textContent = comment.message;

    commentsFragment.append(commentItem);
  });

  socialComments.append(commentsFragment);

};

// Открытие

const openBigPicture = function (photo) {
  fillBigPicture(photo); //
  bigPicture.classList.remove('hidden'); // показываем окно убирая класс скрытия
  document.body.classList.add('modal-open'); // запрет скролла фона
};

const closeBigPicture = function () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

// Обработчики событий

pictureCloseButton.addEventListener('click', () => {
  closeBigPicture();
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
});

export { openBigPicture };

