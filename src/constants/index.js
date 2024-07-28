import path from 'node:path';

const sortOrderList = ['asc', 'desc'];
const ACCESS_TOKEN_LIFETIME = 15 * 60 * 1000;
const REFRESH_TOKEN_LIFETIME = 7 * 24 * 3600 * 1000;
const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'src', 'temp');
const PUBLIC_DIR = path.join(process.cwd(), 'src', 'public');
const PUBLIC_PHOTOS_DIR = path.join(process.cwd(), 'src', 'public', 'photos');
// const PUBLIC_PHOTOS_DIR = path.resolve('src', 'public', 'photos');
const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');

export {
  sortOrderList,
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
  TEMPLATES_DIR,
  TEMP_UPLOAD_DIR,
  PUBLIC_DIR,
  PUBLIC_PHOTOS_DIR,
  SWAGGER_PATH,
};
