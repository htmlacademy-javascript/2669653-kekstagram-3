// Модуль для констант и исходных значений массивов

import { getRandomInteger, getRandomArrayElement } from './utils.js';

//Массив имён
const NAMES = [
  'Иван',
  'Алексей',
  'Мария',
  'Анастасия',
  'Виктор',
  'Юлия',
  'Александр',
  'Светлана',
];

// Массив сообщений
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];


//Массив описаний
const DESCRIPTIONS = [
  'Закат у моря',
  'Весенне утро',
  'Рыбалка у реки',
  'Вечерние пробки',
  'Первый снег',
  'Ремонт дороги',
  'Стройка нового дома',
  'Солнечное затмение',
  'Проливные дожди',
  'Облачное небо',
  'Ночной шторм',
  'Зимний парк',
  'Летний пикник',
  'Путешествие на велосипеде',
  'Книжная полка',
  'Старое здание',
  'Новый памятник',
  'Отдых на пляже',
  'Поход в горы',
  'Креативное искусство',
  'Современная архитектура',
  'Кафе на углу дома',
  'Развод мостов',
  'Летящий самолёт',
  'Прогулка на катере',
  'Осенние ветра'
];


const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;

// Счётчики
let photoIdCounter = 0;
let commentIdCounter = 0;

//  Функция текста комментария (1 или 2 сообщения)
function createMessage() {
  const sentenceCount = getRandomInteger(1, 2);
  const firstSentence = getRandomArrayElement(MESSAGES);

  if (sentenceCount === 1) {
    return firstSentence;
  }

  let secondSentence = getRandomArrayElement(MESSAGES);
  while (secondSentence === firstSentence) {
    secondSentence = getRandomArrayElement(MESSAGES);
  }

  return `${firstSentence} ${secondSentence}`;
}

// Функция одного комментария
function createComment() {
  return {
    id: commentIdCounter++,
    avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
    message: createMessage(),
    name: getRandomArrayElement(NAMES),
  };
}
// Функция массива комментариев
function createComments() {
  const commentCount = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
  return Array.from({ length: commentCount }, createComment);
}

// Функция создания фотографии
function createPhoto() {
  return {
    id: photoIdCounter++,
    url: `photos/${photoIdCounter}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: createComments(),
  };
}

// Генерация массива фотографий
function generatePhotos(count) {
  return Array.from({ length: count }, createPhoto);
}

// Экспорт
export {
  generatePhotos
};
