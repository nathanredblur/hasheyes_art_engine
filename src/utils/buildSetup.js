import fs from 'fs';

const buildSetup = (buildDir) => {
  // delete existing build folder
  if (fs.existsSync(buildDir)) {
    fs.rmdirSync(buildDir, { recursive: true });
  }
  // create build folders
  fs.mkdirSync(buildDir);
  fs.mkdirSync(`${buildDir}/json`);
  fs.mkdirSync(`${buildDir}/videos`);
};

export default buildSetup;