import fs from 'fs';
import cleanName from './cleanName.js';
import getRarityWeight from './getRarityWeight.js';

const getElements = (path) => {
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
        path: `${path}${file}`,
        weight,
      };
    });
  return [elements, totalWeight];
}

const layersSetup = (layersOrder, layersDir) => layersOrder.
  map((layerObj, index) => {
    const [elements, totalWeight] = getElements(`${layersDir}/${layerObj.name}/`)
    return({
      id: index,
      name: layerObj.displayName || layerObj.name,
      bypassDNA: !!layerObj.bypassDNA,
      elements,
      totalWeight,
    })
  });

const getLayersConfigurations = (config, basePath) => {
  const layersDir = `${basePath}/layers`;
  return config.layerConfigurations
    .map(({total, layersOrder}) => ({
      total,
      layers: layersSetup(
        layersOrder,
        layersDir,
      ),
    }))
}

export default getLayersConfigurations;