import path from 'path';
import { cwd } from 'process';

export const getPath = (currBasePath) => path.resolve(cwd(), currBasePath)
export const getRelativePath = (basePath, currBasePath) => path.relative(basePath, currBasePath)