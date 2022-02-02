import path from 'path';
import fs from 'fs';

const getDirectories = (basePath) => {
  const files = fs.readdirSync(basePath);


  //passsing directoryPath and callback function
  fs.readdir(basePath, (err, files) => {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach((file) => {
        // Do whatever you want to do with the file
        console.log(file); 
    });
  });

}