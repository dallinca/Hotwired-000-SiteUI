const path = require("path");

const pathToRootPublic = "../Hotwired-001-SiteUICompiled/public/";

module.exports = {
    outputDir: pathToRootPublic,
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000'
        }
      }
    }
}