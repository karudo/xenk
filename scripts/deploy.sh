#!/bin/bash -e

# When we publish to npm, the published files are available in the root
# directory, which allows for a clean include or require of sub-modules.
#
#    var language = require('react-apollo/server');
#

# Clear the built output
rm -rf ./lib

# Compile new files
npm run compile

# Make sure the ./npm directory is empty
rm -rf ./npm
mkdir ./npm

# Copy all files from ./lib to /npm
cd ./lib && cp -r ./ ../npm/
# Copy also the umd bundle with the source map file
# cp react-apollo.umd.js ../npm/ && cp react-apollo.umd.js.map ../npm/

# Back to the root directory
cd ../

# Ensure a vanilla package.json before deploying so other tools do not interpret
# The built output as requiring any further transformation.
node ./scripts/fpj.js


# Copy few more files to ./npm
cp README.md npm/
cp LICENSE npm/
# cp src/index.js.flow npm/
# please keep this in sync with the filename used in package.main
# cp src/index.js.flow npm/react-apollo.umd.js.flow
# cp -R flow-typed npm/

echo 'deploying to npm...'
# cd npm && npm publish && git push --tags
