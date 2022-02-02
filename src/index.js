import getPath from "./utils/getPath.js";
import { readJSON, writeJSON } from "./utils/json.js";
import buildSetup from "./utils/buildSetup.js";
import { print, printSuccess } from "./utils/printMsg.js";
import processConfig from "./utils/processConfig.js";

const hashEyes = (path) => {
  const basePath = getPath(path);
  const configPath = `${basePath}/config.json`;
  const buildDir = `${basePath}/build`;
  const metaDataPath = `${buildDir}/meta.json`;
  
  const config = readJSON(configPath);
  if (!config) return;

  buildSetup(buildDir);
  print(`Build folder created at ${buildDir}`);

  // Create a list of all the metadata
  const metaData = processConfig(config, basePath);
  writeJSON(metaDataPath, metaData);
  printSuccess(`Metadata created at ${metaDataPath}`);
  
}

export default hashEyes;