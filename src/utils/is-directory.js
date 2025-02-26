import fs from "node:fs/promises";
import { toPath } from "url-or-path";

/**
 * @param {string | URL} directory
 * @param {{allowSymLinks: boolean}} [options]
 * @returns {Promise<boolean>}
 */
async function isDirectory(directory, options) {
  const allowSymLinks = options?.allowSymLinks ?? true;

  let stats;
  try {
    stats = await (allowSymLinks ? fs.stat : fs.lstat)(toPath(directory));
  } catch {
    return false;
  }

  return stats.isDirectory();
}

export default isDirectory;
