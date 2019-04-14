
const commonConfig = {

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            // {
            //     test: /\.m?js$/,
            //     exclude: /(node_modules|bower_components)/,
            //     use: {
            //       loader: 'babel-loader',
            //       options: {
            //         presets: ['@babel/preset-env']
            //       }
            //     }
            // },
        ]
    },
}
module.exports = (env, argv) => {
    let cfg;
    if('production' === argv.mode ){
        cfg = require('./build/webpack.production.config');
    }
    if('development' === argv.mode ){
        cfg =  require('./build/webpack.development.config');
    }
    return {
        ...cfg,
        ...commonConfig,
    }
}