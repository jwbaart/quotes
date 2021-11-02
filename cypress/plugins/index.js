const admin = require('firebase-admin');
const cypressFirebasePlugin = require('cypress-firebase').plugin;
const wp = require('@cypress/webpack-preprocessor');

module.exports = (on, config) => {
  const options = {
    webpackOptions: require('../webpack.config.js')
  };
  on('file:preprocessor', wp(options));
  // Pass on function, config, and admin instance. Returns extended config
  return cypressFirebasePlugin(on, config, admin);
};
