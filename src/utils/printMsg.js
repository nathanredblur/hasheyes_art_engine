
const colorSuccess = "\x1b[32m";
const colorError = "\x1b[31m";
const colorWarning = "\x1b[33m";
const colorInfo = "\x1b[34m";
const colorReset = "\x1b[0m";

export const print = (message) => console.error(colorInfo, message, colorReset);
export const printError = (message) => console.error(colorError, message, colorReset);
export const printSuccess = (message) => console.error(colorSuccess, message, colorReset);
export const printWarning = (message) => console.error(colorWarning, message, colorReset);
export const printReset = (message) => console.error(colorReset, message, colorReset);
