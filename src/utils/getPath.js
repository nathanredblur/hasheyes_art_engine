import path from 'path';
import { cwd } from 'process';

const getPath = (currBasePath) => path.resolve(cwd(), currBasePath)
export default getPath;