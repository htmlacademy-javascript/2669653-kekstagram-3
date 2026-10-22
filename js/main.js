import { renderPhotos } from './pictures.js';
import { getPhotos } from './server.js';
import { showDataError } from './messages.js';
import './form.js';


getPhotos()
  //  массив фотографий уходит в отрисовку.
  .then((photos) => renderPhotos(photos))
  .catch(showDataError);
