
const DATA_ERROR_SHOW_TIME = 5000;


const showDataError = () => {
  const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const dataErrorElement = dataErrorTemplate.cloneNode(true);


  document.body.append(dataErrorElement);


  setTimeout(() => {
    dataErrorElement.remove();
  }, DATA_ERROR_SHOW_TIME);
};

//Механизм показа для #success и #error
const showMessage = (templateId, blockClass, closeButtonClass) => {
  const messageTemplate = document.querySelector(`#${templateId}`).content.querySelector(`.${blockClass}`);
  const messageElement = messageTemplate.cloneNode(true);
  const closeButton = messageElement.querySelector(closeButtonClass);

  closeButton.addEventListener('click', closeMessage);


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

  document.body.append(messageElement);
};

const showSuccess = () => showMessage('success', 'success', '.success__button');


const showSubmitError = () => showMessage('error', 'error', '.error__button');

const isMessageShown = () => Boolean(document.querySelector('.success, .error'));

export { showDataError, showSuccess, showSubmitError, isMessageShown };
