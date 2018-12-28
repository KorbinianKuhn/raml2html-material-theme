const fs = require('fs-extra');
const path = require('path');
const browserify = require('browserify');

const ROOT = path.join(__dirname, '..');

const BUILD_DIRECTORY = `${ROOT}/build/angular`;
const DIST_DIRECTORY = `${ROOT}/dist`;

const getFileContent = async filename => {
  return fs.readFile(`${BUILD_DIRECTORY}/${filename}`, 'utf-8');
};

const build = async () => {
  let content = await fs.readFile(`${BUILD_DIRECTORY}/index.html`, 'utf-8');

  let start = content.indexOf('<link rel="stylesheet" href="styles.css">');
  let template = `${content.slice(0, start)}`;

  let fileContent = await getFileContent('styles.css');
  template += `  <style>${fileContent}</style>\n`;

  start = content.indexOf('<body>');
  let end = content.indexOf('</app-root>');
  template += `${content.slice(start, end)}</app-root>`;

  template += `\n  <script>{{ RAMLDATA }}</script>`;

  for (const file of ['runtime.js', 'polyfills.js', 'main.js']) {
    fileContent = await getFileContent(file);
    template += `\n  <script>${fileContent}</script>`;
  }

  template += `\n</body>\n</html>`;

  // Create dist folder
  await fs.mkdirs(DIST_DIRECTORY);

  // Create index.nunjucks
  await fs.writeFile(`${DIST_DIRECTORY}/root.template`, template);

  // Delete angular build
  await fs.remove(BUILD_DIRECTORY);
};

build().catch(err => {
  console.error(err);
  process.exit(1);
});
