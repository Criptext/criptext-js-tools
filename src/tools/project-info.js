const path = require('path');
const fs = require('fs');

const findPackageJson = currentDir => {
  const maybePackageJsonPath = path.join(currentDir, 'package.json');
  if (fs.existsSync(maybePackageJsonPath)) return maybePackageJsonPath;
  const parentDir = path.resolve(currentDir, '..');
  if (parentDir === currentDir) return; // We've reached the root.
  return findPackageJson(parentDir);
};

const isFrontendProject = packageJson => {
  if (packageJson) {
    const { dependencies } = packageJson;
    if (dependencies && Object.keys(dependencies).includes('react-dom'))
      return true;
  }
  return false;
};

module.exports = {
  findPackageJson,
  isFrontendProject
};
