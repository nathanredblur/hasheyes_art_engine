import fs from 'fs';

const fileExist = (path) => {
  try {
    fs.statSync(path);
    return true;
  } catch (err) {
    return false;
  }
}

export default fileExist;