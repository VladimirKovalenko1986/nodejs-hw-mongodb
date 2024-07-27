import initMongoConnection from './db/initMongoConnection.js';
import setupServer from './server.js';
import createIfDirNotExists from './utils/createIfDirNotExists.js';
import {
  TEMP_UPLOAD_DIR,
  PUBLIC_DIR,
  PUBLIC_PHOTOS_DIR,
} from './constants/index.js';

const bootstrap = async () => {
  await initMongoConnection();
  await createIfDirNotExists(TEMP_UPLOAD_DIR);
  await createIfDirNotExists(PUBLIC_DIR);
  await createIfDirNotExists(PUBLIC_PHOTOS_DIR);
  setupServer();
};

bootstrap();
