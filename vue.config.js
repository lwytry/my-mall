module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'views'     : '@views',
                'assets'    : '@/assets',
                'common'    : '@/common',
                'network'   : '@/network',
                'components'   : '@/components',
            }
        }
    }
}
