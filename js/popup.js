
const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const loaderComments = bigPicture.querySelector('.comments-loader');
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const pictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const commentSample = socialComments.querySelector('.social__comment');

let shownCommentsCount = 0;
let currentComments = [];


const createComment = (comment) => {
  const commentItem = commentSample.cloneNode(true);
  const commentAvatar = commentItem.querySelector('.social__picture');
  const commentText = commentItem.querySelector('.social__text');

  commentAvatar.src = comment.avatar;
  commentAvatar.alt = comment.name;
  commentText.textContent = comment.message;

  return commentItem;
};


const showNextComments = () => {
  const nextComments = currentComments.slice(
    shownCommentsCount,
    shownCommentsCount + COMMENTS_STEP
  );

  const commentsFragment = document.createDocumentFragment();
  nextComments.forEach((comment) => {
    commentsFragment.append(createComment(comment));
  });
  socialComments.append(commentsFragment);

  shownCommentsCount += nextComments.length;
  commentShownCount.textContent = shownCommentsCount;

  if (shownCommentsCount >= currentComments.length) {
    loaderComments.classList.add('hidden');
  }
};


const fillBigPicture = (photo) => {
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;
  commentShownCount.textContent = photo.comments.length;
  commentTotalCount.textContent = photo.comments.length;

  socialCommentsCount.classList.remove('hidden');
  loaderComments.classList.remove('hidden');

  socialComments.innerHTML = '';
  currentComments = photo.comments;

  showNextComments();
};


const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
};


const openBigPicture = function (photo) {
  shownCommentsCount = 0;
  fillBigPicture(photo);
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}


loaderComments.addEventListener('click', () => {
  showNextComments();
});

pictureCloseButton.addEventListener('click', () => {
  closeBigPicture();
});


export { openBigPicture };
