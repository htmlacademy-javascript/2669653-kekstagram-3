
import { renderPhotos } from './pictures.js';


const RANDOM_COUNT = 10;


const TIMEOUT_DELAY = 500;


const FILTERS = {

  'filter-default': (photos) => photos.slice(),

  'filter-random': (photos) => shuffle(photos).slice(0, RANDOM_COUNT),

  'filter-discussed': (photos) => photos.slice().sort((a, b) => b.comments.length - a.comments.length),
};


const filtersBlock = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');

let activeFilterId = 'filter-default';

function shuffle(array) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}


function debounce(callback) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), TIMEOUT_DELAY);
  };
}


const setActiveButton = (activeButton) => {
  filtersForm.querySelectorAll('.img-filters__button').forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  activeButton.classList.add('img-filters__button--active');
};

const initFilters = (photos) => {

  filtersBlock.classList.remove('img-filters--inactive');

  const applyFilter = debounce((filterId) => {
    renderPhotos(FILTERS[filterId](photos));
  });


  filtersForm.addEventListener('click', (evt) => {
    const button = evt.target.closest('.img-filters__button');
    if (!button) {
      return;
    }


    if (button.id === activeFilterId) {
      return;
    }

    activeFilterId = button.id;
    setActiveButton(button);
    applyFilter(button.id);
  });
};

export { initFilters };
