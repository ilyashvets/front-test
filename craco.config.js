const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@page': path.resolve(__dirname, 'src/pages'),
      '@component': path.resolve(__dirname, 'src/components'),
      '@UI': path.resolve(__dirname, 'src/components/UI'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@store': path.resolve(__dirname, 'src/store'),
    },
  },
};
