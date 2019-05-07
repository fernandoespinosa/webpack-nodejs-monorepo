const path = require("path");
const fs = require("fs");

const packagesPath = path.resolve(__dirname, "../packages");
const packageNames = fs
  .readdirSync(packagesPath)
  .map(fileName => `${packagesPath}/${fileName}`)
  .filter(dirPath => fs.lstatSync(dirPath).isDirectory())
  .map(dirPath => {
    const content = fs.readFileSync(`${dirPath}/package.json`, "utf8");
    return JSON.parse(content).name;
  });

/**
 * Resolves imports between namespace packages
 * from `package-name/*` to `package-name/{mainDir}/*`
 * This allows importing files between packages from the package root
 *
 * @param {string} mainDir package entry point (can be 'src' or 'build' depending on the package requirements)
 *
 * Packages built with webpack will want to use 'src' for everything, while packages built with babel will want 'src'
 * for development and 'build' for production builds.
 */
module.exports = mainDir => {
  const aliases = {};

  packageNames.forEach(name => {
    aliases[`${name}/(.+)`] = `${name}/${mainDir}/\\2`;
    aliases[`${name}$`] = `${name}/${mainDir}`;
    aliases[`${name}/package.json`] = `${name}/package.json`;
    aliases[name] = name;
  });

  return [
    "module-resolver",
    {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      root: [`./src`],
      cwd: "packagejson",
      alias: {
        "~/(.+)": `./src/`,
        ...aliases
      }
    }
  ];
};
