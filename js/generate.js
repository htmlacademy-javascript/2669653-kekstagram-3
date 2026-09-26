import {
  NAMES,
  MESSAGES,
  DESCRIPTIONS,
  MIN_COMMENTS,
  MAX_COMMENTS,
  MIN_LIKES,
  MAX_LIKES,
  MIN_AVATAR_ID,
  MAX_AVATAR_ID
} from './data.js';

import { getRandomInteger, getRandomArrayElement } from './util.js';

let photoIdCounter = 1;
let commentIdCounter = 1;

// Функция текста комментария (1 или 2 сообщения)
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

  return firstSentence + ' ' + secondSentence;
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
export function createPhoto() {
  return {
    id: photoIdCounter++,
    url: `photos/${photoIdCounter}.jpg`,
    description: DESCRIPTIONS[photoIdCounter - 1],
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: createComments(),
  };
}

// Генерация массива фотографий
export function generatePhotos(count) {
  return Array.from({ length: count }, createPhoto);
}
