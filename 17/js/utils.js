// Модуль для вспомгательных функций

//Функция, возвращающая рандомное целое число
function getRandomInteger(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// Функция поиска случайного элемента из массивов
function getRandomArrayElement(elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}

// Функция проверки длины строки:
function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}
console.log(checkStringLength('Мой проект', 20));

export {getRandomInteger, getRandomArrayElement};
