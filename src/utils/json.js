import fs from 'fs';
import fileExist from './fileExist.js';
import { parse } from 'jsonc-parser';
import { printError } from './printMsg.js';

export const readJSON = (jsonPath) => {
  if (!fileExist(jsonPath)) {
    printError(`${jsonPath} not found`);
    return undefined;
  }

  try {
    const data = fs.readFileSync(jsonPath, "utf8");
    return parse(data);
  } catch (err) {
    printError("Error reading config.json");
    console.log(err);
    return undefined;
  }
}

export const writeJSON = (jsonPath, data) => {
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
}