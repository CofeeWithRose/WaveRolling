

module.exports = (env, argv) => {
    if('production' === argv.mode ){
        return require('./build/webpack.production.config');
    }
    if('development' === argv.mode ){
        return require('./build/webpack.development.config');
    }
}