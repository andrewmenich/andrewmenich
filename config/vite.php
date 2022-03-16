<?php

use craft\helpers\App;

return [
  'useDevServer' => App::env('ENVIRONMENT') === 'dev',
  'manifestPath' => '@webroot/assets/dist/manifest.json',
  'devServerPublic' => 'http://localhost:3002/',
  'serverPublic' => App::env('PRIMARY_SITE_URL') . '/assets/dist/',
  'errorEntry' => 'src/main.js',
  'cacheKeySuffix' => '',
  'devServerInternal' => 'http://host.docker.internal:3002/',
  'checkDevServer' => false,
  'includeReactRefreshShim' => false,
  'includeModulePreloadShim' => true,
  'criticalPath' => '@webroot/dist/criticalcss',
  'criticalSuffix' =>'_critical.min.css',
];
