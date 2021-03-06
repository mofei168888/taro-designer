/*
 * @Author: fang.yang
 * @Date: 2019-10-31 17:25:55
 * @Description [webpack development mode config]
 */

const path = require('path');
const webpack = require('webpack');

const { target } = require('../server-config');

const srcDir = path.join(__dirname, '..');
const publicPath = '/';

const devServer = {
	clientLogLevel: 'warning',
	disableHostCheck: true,
	proxy: {
		'/taro-designer-api': {
			target,
			logLevel: 'debug'
		}
	},
	historyApiFallback: {
		rewrites: [{ from: /.*/, to: path.posix.join(publicPath, 'index.html') }]
	},
	hot: true,
	contentBase: srcDir,
	compress: true,
	overlay: {
		warnings: false,
		errors: true
	}
};

module.exports = () => ({
	devServer,
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	output: {
		publicPath,
		filename: '[name].js',
		path: path.join(__dirname, '../dist')
	},
	bail: true,
	module: {
		rules: [
			{
				test: /\.(css|less)$/,
				use: ['style', 'css', 'less']
			}
		]
	},
	plugins: [new webpack.HotModuleReplacementPlugin()]
});

// 引入mock服务
require('../taro-designer-server');
