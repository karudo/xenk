var path = require('path');
var fs = require('fs');

var package = require(path.join(__dirname, '../package.json'));

delete package.babel;
delete package["lint-staged"];
delete package.jest;
delete package.bundlesize;
delete package["pre-commit"];
delete package.scripts;
delete package.options;

package.main = 'react-apollo.umd.js';
// package.browser = 'react-apollo.browser.umd.js';
package.module = 'index.js';
package['jsnext:main'] = 'index.js';
package.typings = 'index.d.ts';

fs.writeFileSync(path.join(__dirname, '../npm/package.json'), JSON.stringify(package, null, 2));
