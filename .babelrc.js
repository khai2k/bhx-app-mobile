/* eslint-disable prefer-template */
module.exports = {
    env: {
        production: {
            plugins: ['transform-remove-console']
        }
    },
    plugins: [
        //remember npm start --reset-cache
        [
            'module-resolver',
            {
                root: ['./app'],
                alias: {
                    '@app': './app',
                    '@app/common': './app/common',
                    '@app/constants': './app/constants',
                    '@app/translate': './app/translate',
                    '@app/styles': './app/styles',
                    '@app/components': './app/components',
                    '@app/redux': './app/redux'
                }
            }
        ]
    ]
};
