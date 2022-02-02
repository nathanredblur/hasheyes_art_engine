import path from 'path';
import { RARITY_DELIMITER } from './const.js';

const cleanName = (filePath) => {
  const fileName = path.parse(filePath).name;
  return fileName.split(RARITY_DELIMITER).shift()
};

export default cleanName;