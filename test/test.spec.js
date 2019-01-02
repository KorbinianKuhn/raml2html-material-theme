const raml2html = require('raml2html');
const path = require('path');
const fs = require('fs-extra');

it('test raml build', async () => {
  const templatePath = path.join(__dirname, '..', 'index.js');
  const ramlPath = path.join(__dirname, '..', 'example/api.raml');
  const config = raml2html.getConfigForTheme(templatePath);

  expect(async () => {
    const html = await raml2html.render(ramlPath, config);
    const expectedPath = path.join(__dirname, '..', 'example', 'example.html');
    await fs.writeFile(expectedPath, html);
  }).not.toThrow();
});
