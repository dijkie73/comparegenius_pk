// New copy task for font files
module.exports = {
    copyFontAwesome: {
        src: ['{{ROOT}}/node_modules/font-awesome/fonts/**/*'],
        dest: '{{WWW}}/assets/fonts'
    },
    copyRobotsTxt: {
        src: ['{{ROOT}}/src/robots.txt'],
        dest: '{{WWW}}/'
    },
    copyFavIcon: {
        src: ['{{ROOT}}/src/assets/ico/favicon.ico'],
        dest: '{{WWW}}/'
    }
};
