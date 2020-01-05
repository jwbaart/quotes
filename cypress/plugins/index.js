const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor');
const cypressFirebasePlugin = require('cypress-firebase').plugin;

module.exports = (on, config) => {
  on('file:preprocessor', cypressTypeScriptPreprocessor);

  // Return extended config (with settings from .firebaserc)
  return cypressFirebasePlugin(config);
};
