import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './..//webpack.config.client.js';

const compile = app => {
  if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(webpackConfig);
    const middleware = webpackHotMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    });
    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
  }
};

export default { compile };
