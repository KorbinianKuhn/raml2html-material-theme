const path = require('path');
const raml2html = require('raml2html');
const fs = require('fs-extra');
const marked = require('marked');

const root = path.join(__dirname, '..');

const example = `${root}/example/api.raml`;

const build = async () => {
  const ramlObj = await raml2html.render(example);

  ramlObj.documentation.map(o => {
    o.content = marked(o.content);
  });

  await fs.writeFile(
    `${root}/example/api.ts`,
    `export const ramlData = ${JSON.stringify(ramlObj)}`
  );
};

build()
  .then(() => {
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
