let mix = require('laravel-mix');

const config = {
  host: process.env.HMR_SHARED_HOST,
  port: process.env.HMR_PORT,
  path: process.env.HMR_PATH,
  clientHost: process.env.HMR_SITE_HOST,
  protocol: process.env.HMR_HTTPS === "true" ? 'https://' : 'http://',
  outputPath: function(){
    return `${this.protocol}${this.clientHost}:${this.port}${this.path}`
  },
}

// ? ========== DEVELOPMENT SETTINGS ==========
if(!mix.inProduction()){
  mix.setPublicPath('public/build/')
     .js('./src/js/app.js', 'js')
     .postCss('./src/css/app.css', 'css', [ 
        require('postcss-import'),
        require('tailwindcss')('./tailwind.config.js'),
        require('postcss-focus-visible')
      ])
     .sourceMaps(true, 'source-map');
  mix.webpackConfig({
      target: 'web',
      output: {
        publicPath: config.outputPath()
      },
      devServer:{
        host: config.host,
        port: config.port,
        dev: {
          publicPath: config.path,
        },
        client: {
          port: config.port,
          host: config.clientHost,
          overlay: true,
          progress: false,
        },
        firewall: false,
        static: {
          directory: './templates',
          publicPath: '/',
          watch: true
        },
        liveReload: true,
      },
      infrastructureLogging: {
        level: 'log',
      },
    });
} else {
  // ? ========== PRODUCTION SETTINGS ==========
  mix.webpackConfig({
    output: {
      publicPath: '/assets/dist/',
      chunkFilename: 'js/components/[name].[chunkhash:8].js',
      clean: true,
    },
    optimization: {
      chunkIds: 'named',
      moduleIds: 'named'
    },
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
      require('postcss-focus-visible'),
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