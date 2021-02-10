let path = require('path');
let CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');
let mix = require('laravel-mix');
const purgecss = require('@fullhuman/postcss-purgecss')

// ? ========== DEVELOPMENT SETTINGS ==========
if(!mix.inProduction()){
  mix.setPublicPath('public/build/')
     .js('./src/js/app.js', 'js')
     .postCss('./src/css/app.css', 'css', [ 
        require('postcss-import'),
        require('tailwindcss')('./tailwind.config.js')
      ])
     .sourceMaps(true, 'source-map');
  mix.webpackConfig({
    // fixes hmr bug introduced in Webpack 5
      target: 'web',
      output: {
        publicPath: 'http://0.0.0.0:8080/',
      },
      devServer:{
        public: 'http://0.0.0.0:8080/',
        host: '0.0.0.0',
        port: 8080,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      },
    });
  mix.browserSync({
    // ? Defined in the .env file - sameas default site url
    proxy: process.env.DEFAULT_SITE_URL,
    watch: true,
    watchOptions: {
      ignoreInitial: true,
      ignored: '*.css'
    },
    files: ['./templates'],
    ignore: "/node_modules/",
    cors: true
  });
} else {
  // ? ========== PRODUCTION SETTINGS ==========
  mix.webpackConfig({
    output: {
      publicPath: '/assets/dist/',
      chunkFilename: 'js/components/[name].[chunkhash:8].js',
    },
    optimization: {
      chunkIds: 'named',
      moduleIds: 'named'
    },
    plugins: [
      new CleanObsoleteChunks(),
    ]
  });
  mix.setPublicPath('public/assets/dist/')
    .js('./src/js/app.js', 'js')
    .postCss('./src/css/app.css', 'css', [
      require('postcss-import'),
      require('tailwindcss')('./tailwind.config.js'),
      require('postcss-preset-env')({ 
        stage: 1 ,
        autoprefixer: { grid: true },
        features: {
          'focus-within-pseudo-class': false
        }
      }),
      require('cssnano'),
      // purgecss({
      //   content: ['./templates/**/*.html', './templates/**/*.twig', './src/js/**/*.js', './public/assets/svg/**/*.svg'],
      // })
    ])
  mix.options({
    processCssUrls: false
  })
}

mix.disableNotifications();