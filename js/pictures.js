// Модуль отрисовки фото
import { openBigPicture } from './popup.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const photoFragment = document.createDocumentFragment();

const createPicture = function (picture) {
  const photoElement = pictureTemplate.cloneNode(true);
  const imageElement = photoElement.querySelector('.picture__img');
  imageElement.src = picture.url;
  imageElement.alt = picture.description;
  photoElement.querySelector('.picture__likes').textContent = picture.likes;
  photoElement.querySelector('.picture__comments').textContent = picture.comments.length;

  photoElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(picture);
  });
  return photoElement;

};

const renderPhotos = (pictures) => {
  pictures.forEach((picture) => {
    const pictureElement = createPicture(picture);
    photoFragment.append(pictureElement);
  });

  picturesContainer.append(photoFragment);
};


export { renderPhotos };


