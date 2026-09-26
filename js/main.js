
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
]

//Переменная с числом объектов
const PHOTO_COUNT = 25;

// Переменные для остальных числовых значений
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;



// Счётчик ID-номера к каждой фотографии
let photoIdCounter = 1;

// Счетчик для ID случайного комментария
let commentIdCounter = 1;


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

// Функция текста комментария (по условию 1 или 2 сообщения)
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
  const comment = {
    id: commentIdCounter,
    avatar: 'img/avatar-' + getRandomInteger(MIN_AVATAR_ID, MAX_AVATAR_ID) + '.svg',
    message: createMessage(),
    name: getRandomArrayElement(NAMES),
  };

  commentIdCounter++;

  return comment;
}

// Функция массива комментариев (по условию от 1 до 30)
function createComments() {
  const commentCount = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);

  return Array.from({ length: commentCount }, createComment);
}

// Функция создания фотографии и лайков к фотографии (по условию от 15 до 200)
function createPhoto() {
  const photo = {
    id: photoIdCounter,
    url: 'photos/' + photoIdCounter + '.jpg',
    description: DESCRIPTIONS[photoIdCounter - 1],
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: createComments(),
  };

  photoIdCounter++;

  return photo;
}

const photos = Array.from({ length: PHOTO_COUNT }, createPhoto);

console.log(photos);
