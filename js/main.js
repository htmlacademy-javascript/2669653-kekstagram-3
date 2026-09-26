import { PHOTO_COUNT } from './data.js';
import { generatePhotos } from './generate.js';

const photos = generatePhotos(PHOTO_COUNT);
 

console.log(photos);
