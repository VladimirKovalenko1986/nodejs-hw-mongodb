import fs from 'node:fs/promises';

const createIfDirNotExists = async (url) => {
  try {
    await fs.access(url);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(url);
    }
  }
};

export default createIfDirNotExists;
