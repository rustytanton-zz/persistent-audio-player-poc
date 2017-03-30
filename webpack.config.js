const path = require('path')

module.exports = {
  entry: './All.js',
  output: {
    filename: 'All.js',
    path: path.resolve(__dirname, 'dist')
  }
}
