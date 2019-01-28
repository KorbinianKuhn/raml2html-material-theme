const path = require('path');
const marked = require('marked');
const fs = require('fs-extra');

const processRamlObj = async (ramlObj, config) => {
  const basePath = path.join(__dirname, 'dist', 'root.template');

  if (!ramlObj.documentation) {
    ramlObj.documentation = [];
  } else {
    ramlObj.documentation.map(o => {
      o.content = marked(o.content);
    });
  }

  const content = await fs.readFile(basePath, 'utf-8');

  return content
    .replace('{{ RAMLTITLE }}', ramlObj.title)
    .replace('{{ RAMLDATA }}', `var ramlData = ${JSON.stringify(ramlObj)}`);
};

module.exports = () => {
  return {
    processRamlObj
  };
};
