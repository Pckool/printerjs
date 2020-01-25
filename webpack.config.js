const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const plugins = [
	
];

module.exports = {
	mode: 'development',
	entry: {
		
		'print-html-element.min': path.join(__dirname, 'src/element-printer.ts'),
		'print-html-element': path.join(__dirname, 'src/element-printer.ts'),
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