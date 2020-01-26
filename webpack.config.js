const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const plugins = [
	
];

module.exports = {
	mode: 'development',
	entry: {
		
		'printer.min': path.join(__dirname, 'src/printer.ts'),
		'printer': path.join(__dirname, 'src/printer.ts'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		library: 'elementPrinter',
		libraryTarget: 'umd'
		
	},
	plugins: plugins,
	optimization: {
		minimizer: [new UglifyJsPlugin()],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ['ts-loader'],
				exclude: /node_modules/,
			},
		]
	}
};