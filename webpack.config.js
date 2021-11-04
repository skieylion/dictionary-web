const path = require('path');
const webpack=require('webpack');
const autoprefixer = require ('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ThymeleafInjectWebpackPlugin = require('thymeleaf-inject-webpack-plugin');

module.exports = {
  entry: ["@babel/polyfill",'./webapp/main.js'],
  output: {
    path: path.resolve(__dirname, './src/main/resources/templates'),
    filename: 'bundle.js'
  },
  optimization: {
		minimize: false
  },
  module:
  { 

	  rules: 
	  [
{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
				test: /\.(png|jpg|gif|svg|ttf|woff)$/i,
				use: [
				  {
					loader: 'url-loader',
					options: {
					  limit: 999999
					}
				  }
				]
			},
	  {
	    test: /\.css$/, 
	    use: [
	        require.resolve('style-loader'),
	        {
	            loader: require.resolve('css-loader'),
	            options: { modules: { localIdentName: "[name]__[local]___[hash:base64:5]"}},
	        },
	        {
	            loader: require.resolve('postcss-loader'),
	            options: {
	                // Necessary for external CSS imports to work
	                // https://github.com/facebookincubator/create-react-app/issues/2677
	                ident: 'postcss',
	                plugins: () => [
	                    require('postcss-flexbugs-fixes'),
	                    autoprefixer({
	                        browsers: [
	                            '>1%',
	                            'last 4 versions',
	                            'Firefox ESR',
	                            'not ie < 9', // React doesn't support IE8 anyway
	                        ],
	                        flexbox: 'no-2009',
	                    }),
	                    require('postcss-modules-values'),
	                ],
	            },
	        },
	    ]
	}
	  ]
  },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: './webapp/index.html' },
                { from: './webapp/CardMaker.html' }
            ]
        })
    ]
};