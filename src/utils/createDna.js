import { DNA_DELIMITER, UNIQUE_DNA_TORRANCE } from "./const.js";

const dnaList = new Set();
let failedCount = 0;

const createRandomDna = (layers) => {
  const dnaChain = [];
  const layerDna = [];

  layers.forEach((layer) => {
    const { elements, totalWeight, ...layerConfig } = layer;
    let random = Math.floor(Math.random() * totalWeight);

    for (const element of elements) {
      // subtract the current weight from the random weight until we reach a sub zero value.
      random -= element.weight;
      if (random < 0) {
        layerDna.push({
          ...layerConfig,
          selectedElement: element
        });
        if (!layer.bypassDNA)
          dnaChain.push(`${element.id}:${element.filename}`);
        return;
      }
    }
  });

  const dnaId = dnaChain.join(DNA_DELIMITER);
  return {dnaId, layerDna};
}

const createDna = (layers, random) => {
  if (random) {
    while (true) {
      const metaDna = createRandomDna(layers);
      if (!dnaList.has(metaDna.dnaId)) {
        dnaList.add(metaDna.dnaId);
        return metaDna;
      }

      failedCount++;
      if (failedCount >= UNIQUE_DNA_TORRANCE) {
        failedCount = 0;
        return null;
      }
    }
  }else{
    // TODO: implement a sequential dna creation
  }
  
};

export default createDna;