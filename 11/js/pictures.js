// Модуль отрисовки фото
import { openBigPicture } from './popup.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const photoFragment = document.createDocumentFragment();

const createPicture = function (photoGallery) {
  const photoElement = pictureTemplate.cloneNode(true);
  const imageElement = photoElement.querySelector('.picture__img');
  imageElement.src = photoGallery.url;
  imageElement.alt = photoGallery.description;
  photoElement.querySelector('.picture__likes').textContent = photoGallery.likes;
  photoElement.querySelector('.picture__comments').textContent = photoGallery.comments.length;

  photoElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(photoGallery);
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


