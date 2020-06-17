import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';

const htmlPath = 'scripts/index.html';

const htmlFile = readFileSync(htmlPath, 'utf8');

const dom = new JSDOM(htmlFile);
console.log(dom.window.document.querySelector("p").textContent); // "Hello world"

