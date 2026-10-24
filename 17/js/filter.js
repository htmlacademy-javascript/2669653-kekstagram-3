// Модуль фильтрации фотографий
import { renderPhotos } from './pictures.js';

// Количество фотографий в фильтре «Случайные»
const RANDOM_COUNT = 10;

// Задержка перед применением фильтра (устранение дребезга)
const timeoutDelay = 500;

//Ищем элементы
const filtersBlock = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');

// Функция устранения дребезга.

function debounce(callback) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const shuffle = (array) => {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

// Порядок отрисовки для каждого фильтра.
// Исходный массив не меняем, каждый фильтр работает с копией.
const FILTERS = {
  // По умолчанию: изначальный порядок с сервера
  'filter-default': (photos) => photos.slice(),
  // Случайные: 10
  'filter-random': (photos) => shuffle(photos).slice(0, RANDOM_COUNT),
  // Обсуждаемые: по убыванию количества комментариев
  'filter-discussed': (photos) => photos.slice().sort((a, b) => b.comments.length - a.comments.length),
};

//Функци переносит активное состояние на нажатую кнопку:
const setActiveButton = (activeButton) => {
  filtersForm.querySelectorAll('.img-filters__button').forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  activeButton.classList.add('img-filters__button--active');
};

const initFilters = (photos) => {
  // Показываем блок фильтров, когда данные загружены
  filtersBlock.classList.remove('img-filters--inactive');

  const applyFilter = debounce((filterId) => {
    renderPhotos(FILTERS[filterId](photos));
  });

  // Один обработчик на форму: клики по кнопкам делегируются
  filtersForm.addEventListener('click', (evt) => {
    const button = evt.target.closest('.img-filters__button');
    if (!button) {
      return;
    }

    setActiveButton(button);
    applyFilter(button.id);
  });
};

export { initFilters };
