var path = require('path');

var webpack = require('webpack');

var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const context = path.resolve(__dirname, 'js');

require('babel-core/register')({
  presets: ['es2015', 'react']
});
require.extensions['.scss'] = () => {
  return;
};
require.extensions['.css'] = () => {
  return;
};

module.exports = {
  context,
  entry: path.resolve(__dirname, 'js/index.js'),
  output: {
    path: path.resolve(__dirname, 'build/js'),
    filename: 'index.js',
  },
  resolve: {
        extensions: ['', '.js', '.jsx', '.css'],
        modulesDirectories: [
          'node_modules'
        ]        
    },
  devtool: 'inline-source-map',
  module: {
    loaders: [{
      test: /\.css$/,
      include: path.resolve(__dirname, 'js'),
      exclude: /(node_modules)/,
      loaders: [
          'style-loader',
          'css-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        ],
    }, 
    {   
        test: /\.js$/,
        include: path.resolve(__dirname, 'js'),
        loader: 'babel-loader',
        presets: ['es2015', 'react'],
      query: {
         plugins: [
            'transform-react-jsx',
            [
              'react-css-modules',
              {
                context
              }
            ]
         ]
      }
    }, ]
  }
};