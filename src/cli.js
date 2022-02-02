#!/usr/bin/env node

import { printError } from './utils/printMsg.js';
import hashEye from './index.js';

const appName = "hashEyes";

const cli = () => {
  const dir = process.argv[2];
  if (!dir)
    return printError(`please enter project name, run: ${appName} [project-name]`);

  hashEye(dir)
}

cli();