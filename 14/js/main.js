import { generatePhotos } from './data.js';
import { renderPhotos } from './pictures.js';
import './form.js';
const PHOTO_COUNT = 25;
const photos = generatePhotos(PHOTO_COUNT);
renderPhotos(photos);

