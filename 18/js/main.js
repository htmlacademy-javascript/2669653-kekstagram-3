import { renderPhotos } from './pictures.js';
import { getPhotos } from './server.js';
import { showDataError } from './messages.js';
import { initFilters } from './filter.js';
import './form.js';


getPhotos()
  //  массив фотографий уходит в отрисовку и в фильтры
  .then((photos) => {
    renderPhotos(photos);
    initFilters(photos);
  })


  .catch(showDataError);
