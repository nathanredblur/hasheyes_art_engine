import { UNIQUE_DNA_TORRANCE } from "./const.js";
import createDna from "./createDna.js";
import getLayersConfigurations from "./getLayersConfigurations.js";
import { print, printError } from "./printMsg.js";
const { createHash } = await import('crypto');

const random = true;
const videoFormat = "mp4";

const getAttributes = (layerDna) => layerDna
  .map((layer) => ({
    trait_type: layer.name,
    value: layer.selectedElement.name,
    path: layer.selectedElement.path,
  })
);

const parseMetaData = (config, dnaId, layerDna, editionCount) => {
  const hash = createHash('sha1').update(dnaId).digest('hex');
  const dateTime = Date.now();
  const { name, description, baseUri, author, version, tags, extraMetadata, } = config;
  return {
    name: `${name} #${editionCount}`,
    description,
    author, 
    version, 
    tags,
    image: `${baseUri}/${editionCount}.${videoFormat}`,
    dna: hash,
    edition: editionCount,
    date: dateTime,
    ...extraMetadata,
    attributes: getAttributes(layerDna),
    compiler: "HashEyes Art Engine",
  };
}

const processConfig = (config, basePath) => {
  let layerConfigIndex = 0;
  let editionCount = 1;
  const metaDataList = [];

  const layerConfigurations = getLayersConfigurations(config, basePath);
  
  while (layerConfigIndex < layerConfigurations.length) {
    const { layers, total} = layerConfigurations[layerConfigIndex];

    let setCount = 0;
    while (setCount < total) {
      const metaDna = createDna(layers, random);
      if (!metaDna) {
        printError(`Failed to create dna after ${UNIQUE_DNA_TORRANCE} tries`);
        break;
      }

      metaDataList.push(parseMetaData(config, metaDna.dnaId, metaDna.layerDna, editionCount));

      setCount++;
      print(`${setCount}/${total} - ${editionCount}:${metaDna.dnaId}`);
      editionCount++;
    }
    layerConfigIndex++;
  }

  return metaDataList;
}

export default processConfig;