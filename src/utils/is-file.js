import fs from "node:fs/promises";
import { toPath } from "url-or-path";

/**
 * @param {string | URL} file
 * @param {{allowSymLinks: boolean}} [options]
 * @returns {Promise<boolean>}
 */
async function isFile(file, options) {
  const allowSymLinks = options?.allowSymLinks ?? true;

  let stats;
  try {
    stats = await (allowSymLinks ? fs.stat : fs.lstat)(toPath(file));
  } catch {
    return false;
  }

  return stats.isFile();
}

export default isFile;
