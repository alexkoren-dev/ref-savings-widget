const {
  override,
} = require('customize-cra');
const path = require('path');

const overrideProcessEnv = (value) => (config) => {
  const { plugins } = config;
  const plugin = plugins.find((p) => p.constructor.name === 'DefinePlugin');
  const processEnv = plugin.definitions['process.env'] || {};

  plugin.definitions['process.env'] = {
    ...processEnv,
    ...value,
  };

  return config;
};

module.exports = override(
  overrideProcessEnv({
    APP_BASE_URL: JSON.stringify(process.env.APP_BASE_URL || 'APP_BASE_URL'),
  }),
);
