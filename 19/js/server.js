// Модуль взаимодействия с удалённым сервером

const SERVER_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

// Получение данных с сервера
const getPhotos = () =>
  fetch(`${SERVER_URL}/data`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка загрузки данных: ${response.status}`);
      }

      return response.json();
    });

// Отправка данных на сервер
const sendPhoto = (formData) =>
  fetch(SERVER_URL, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка отправки данных: ${response.status}`);
      }
    });

export { getPhotos, sendPhoto };

