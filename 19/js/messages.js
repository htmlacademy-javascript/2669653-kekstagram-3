// Модуль показа сообщений

//Переменная со значением времени показа сообщения об ошибке в 5 с
const DATA_ERROR_SHOW_TIME = 5000;

// Сообщение об ошибке загрузки данных с сервера
const showDataError = () => {
  const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const dataErrorElement = dataErrorTemplate.cloneNode(true);

  //Ставит элемент в конец body
  document.body.append(dataErrorElement);


  //Через 5 секунд убираем сообщение
  setTimeout(() => {
    dataErrorElement.remove();
  }, DATA_ERROR_SHOW_TIME);
};

//Механизм показа для #success и #error
const showMessage = (templateId, blockClass, closeButtonClass) => {
  const messageTemplate = document.querySelector(`#${templateId}`).content.querySelector(`.${blockClass}`);
  const messageElement = messageTemplate.cloneNode(true);
  const closeButton = messageElement.querySelector(closeButtonClass);

  // Закрытие: убрать элемент из DOM


  //Сообщение должно удаляться со страницы после нажатия на кнопку .success__button
  closeButton.addEventListener('click', closeMessage);

  //Сообщение должно удаляться со страницы по нажатию на клавишу Esc
  const onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  };

  document.addEventListener('keydown', onEscKeydown);

  //По клику на произвольную область экрана за пределами блока с сообщением.
  const onOutsideClick = (evt) => {
    if (!evt.target.closest(`.${blockClass}__inner`)) {
      closeMessage();
    }
  };

  function closeMessage() {
    messageElement.remove();
    document.removeEventListener('keydown', onEscKeydown);
    document.removeEventListener('click', onOutsideClick);
  }

  document.addEventListener('click', onOutsideClick);
  //Разметку сообщения, которая находится в блоке #error внутри шаблона template, нужно разместить перед закрывающим тегом </body>
  document.body.append(messageElement);
};

// Сообщение об успешной отправке формы.
const showSuccess = () => showMessage('success', 'success', '.success__button');

// Сообщение об ошибке отправки формы.
const showSubmitError = () => showMessage('error', 'error', '.error__button');

const isMessageShown = () => Boolean(document.querySelector('.success, .error'));

export { showDataError, showSuccess, showSubmitError, isMessageShown };
