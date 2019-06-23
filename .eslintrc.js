const { base, overwritePresets } = require('@sumup/foundry/eslint');

const custom = {
  rules: {
    'notice/notice': 'off'
  }
};

module.exports = overwritePresets(base, custom);
