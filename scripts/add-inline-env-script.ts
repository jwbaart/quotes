import { readFileSync, writeFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import { envConfigFile } from './write-angular-env';

const htmlPath = 'dist/quotes/index.html';

const htmlFile = readFileSync(htmlPath, 'utf8');
const jsdom = new JSDOM(htmlFile);
const { window } = jsdom;

const createScriptElement = (code, document) => {
  code = code || '';
  const script = document.createElement('script');
  script.type = 'text/javascript';
  const scriptCode = document.createTextNode(code);

  try {
    script.appendChild(scriptCode);
  } catch (e) {
    console.log('createScript: appending', e);
  }
  return script;
};

const envScript = createScriptElement(envConfigFile, window.document);

try {
  window.document.head.appendChild(envScript);
} catch (e) {
  console.log('error:', e);
}

const serializedDom = jsdom.serialize();

writeFileSync(htmlPath, serializedDom, 'utf8');
