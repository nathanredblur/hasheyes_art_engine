import path from 'path';
import { RARITY_DELIMITER } from './const.js';

const getRarityWeight = (filePath) => {
  const fileName = path.parse(filePath).name;
  const rarity = Number(
    fileName.split(RARITY_DELIMITER).pop()
  );

  return !isNaN(rarity) ? rarity : 1;
};

export default getRarityWeight;