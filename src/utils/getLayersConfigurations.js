import fs from 'fs';
import { getRelativePath } from "./getPath.js";
import cleanName from './cleanName.js';
import getRarityWeight from './getRarityWeight.js';

const getElements = (elementPath, basePath) => {
  const path = `${basePath}/layers/${elementPath}/`;
  let totalWeight = 0;
  const elements = fs
    .readdirSync(path)
    .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
    .map((file, index) => {
      if (file.includes("-")) {
        throw new Error(`layer name can not contain dashes, please fix: ${file}`);
      }
      const weight = getRarityWeight(file);
      totalWeight += weight;
      return {
        id: index,
        name: cleanName(file),
        filename: file,
        path: getRelativePath(basePath, `${path}${file}`),
        weight,
      };
    });
  return {elements, totalWeight};
}

const layersSetup = (layersOrder, basePath) => layersOrder.
  map((layerObj, index) => {
    const {elements, totalWeight} = getElements(layerObj.name, basePath)
    return({
      id: index,
      name: layerObj.displayName || layerObj.name,
      bypassDNA: !!layerObj.bypassDNA,
      elements,
      totalWeight,
    })
  });

const getLayersConfigurations = (config, basePath) => config.layerConfigurations
    .map(({total, layersOrder}) => ({
      total,
      layers: layersSetup(
        layersOrder,
        basePath,
      ),
    }))

export default getLayersConfigurations;