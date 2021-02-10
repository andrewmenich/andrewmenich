import Prism from 'prismjs';
// import * as Normalizer from 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';

export function initPrism() {

  Prism.plugins.NormalizeWhitespace.setDefault({
    'remove-trailing': true,
    'remove-indent': true,
    'left-trim': true,
    'right-trim': true,
  });
  
  Prism.highlightAll();

};