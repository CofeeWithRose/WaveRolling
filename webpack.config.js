
module.exports = (env, argv) => {
    if('production' === argv.mode ){
        return require('./webpack.production.config');
    }
    if('development' === argv.mode ){
        return require('./webpack.development.config');
    }
}