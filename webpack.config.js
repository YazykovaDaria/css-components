/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable global-require */
const path = require('path');
const globule = require('globule');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

const pathToPages = path.join(__dirname, 'src/pages');

const pages = globule.find(path.join(pathToPages, '/**/*.html')).reduce((entry, file) => {
  const name = path.relative(pathToPages, file).replace(/\.html$/, '');
  entry[name] = file;
  return entry;
}, {});

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true,
      },
    },
    port: 3000,
    open: true,
    hot: true,
  },

  resolve: {
    alias: {
      '@images': path.join(__dirname, 'src/assets/images'),
      '@icons': path.join(__dirname, 'src/assets/icons'),
      '@styles': path.join(__dirname, 'src/style'),
      '@scripts': path.join(__dirname, 'src/js'),
    },
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  plugins: [
    new HtmlBundlerPlugin({
      entry: pages,
      js: {
        filename: 'js/[name].[contenthash:8].js',
      },
      css: {
        filename: 'style/[name].[contenthash:8].css',
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: ['css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|webp|gif|svg|ico)/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash:8][ext]',
        },
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
      {
        test: /[\\/]fonts[\\/].+(woff2?|ttf|otf|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
    ],
  },
};
