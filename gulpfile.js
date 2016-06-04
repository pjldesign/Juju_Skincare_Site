var $        = require('gulp-load-plugins')();
var argv     = require('yargs').argv;
var browser  = require('browser-sync');
var gulp     = require('gulp');
var panini   = require('panini');
var rimraf   = require('rimraf');
var sequence = require('run-sequence');
var sherpa   = require('style-sherpa');
// var strip    = require('gulp-stripbom')

// Check for --production flag
var isProduction = !!(argv.production);

// Port to use for the development server.
var PORT = 8000;

// Browsers to target when prefixing CSS.
var COMPATIBILITY = ['last 2 versions', 'ie >= 9'];

// File paths to various assets are defined here.
var PATHS = {
  assets: [
    'src/assets/**/*',
    '!src/assets/{!img,js,scss}/**/*'
  ],
  sass: [
    'bower_components/foundation-sites/scss',
    'bower_components/motion-ui/src/'
  ],
  javascript: [
    // 'bower_components/spf/dist/spf.js',
    'bower_components/jquery-pjax/jquery.pjax.js',
    'bower_components/what-input/what-input.js',
    'bower_components/foundation-sites/js/foundation.core.js',
    'bower_components/foundation-sites/js/foundation.util.mediaQuery.js',
    'bower_components/foundation-sites/js/foundation.util.*.js',
    'bower_components/foundation-sites/js/foundation.abide.js',
    'bower_components/foundation-sites/js/foundation.accordion.js',
    'bower_components/foundation-sites/js/foundation.accordionMenu.js',
    'bower_components/foundation-sites/js/foundation.drilldown.js',
    'bower_components/foundation-sites/js/foundation.dropdown.js',
    'bower_components/foundation-sites/js/foundation.dropdownMenu.js',
    'bower_components/foundation-sites/js/foundation.equalizer.js',
    'bower_components/foundation-sites/js/foundation.interchange.js',
    'bower_components/foundation-sites/js/foundation.magellan.js',
    'bower_components/foundation-sites/js/foundation.offcanvas.js',
    'bower_components/foundation-sites/js/foundation.orbit.js',
    'bower_components/foundation-sites/js/foundation.responsiveMenu.js',
    'bower_components/foundation-sites/js/foundation.responsiveToggle.js',
    'bower_components/foundation-sites/js/foundation.reveal.js',
    'bower_components/foundation-sites/js/foundation.slider.js',
    'bower_components/foundation-sites/js/foundation.sticky.js',
    'bower_components/foundation-sites/js/foundation.tabs.js',
    'bower_components/foundation-sites/js/foundation.toggler.js',
    'bower_components/foundation-sites/js/foundation.tooltip.js',
    'bower_components/jQuery.mmenu/dist/js/jquery.mmenu.all.min.js',
    'bower_components/skrollr/dist/skrollr.min.js',
    'bower_components/skrollr-menu/dist/skrollr.menu.min.js',
    'bower_components/custom-select-menu/custom-select-menu.jquery.js',
    'bower_components/mediaCheck/js/mediaCheck-min.js',
    'bower_components/background-check/background-check.min.js',
    'src/assets/js/_colourBrightness.js-master/jquery.colourbrightness.min.js',
    'bower_components/Scrollify/jquery.scrollify.min.js',
    'src/assets/js/_new-rs-9.5.7/royalslider/jquery.royalslider.custom.min.js',
    'src/assets/js/juju.js',
    'src/assets/js/_Krishnaglossary/js/glossary.js',
    'src/assets/js/run.js'
  ],
  // async: [
  //   'bower_components/background-check/background-check.min.js',
  //   'src/assets/js/_colourBrightness.js-master/jquery.colourbrightness.min.js',
  //   'bower_components/Scrollify/jquery.scrollify.min.js',
  //   // 'bower_components/fullpage.js/vendors/jquery.slimscroll.min.js',
  //   // 'bower_components/fullpage.js/jquery.fullPage.min.js',
  //   'src/assets/js/async.js'
  // ],
  json: [
    'src/assets/js/_Krishnaglossary/data/*.json'
  ]
  // glossary: [
  //   'bower_components/jquery-easing/jquery.easing.js',
  //   'bower_components/jquery.transit/jquery.transit.js',
  //   'bower_components/jquery-color/jquery.color.js',
  //   'bower_components/jquery-autocomplete/jquery.autocomplete.min.js',
  //   'src/assets/js/_taxonomy/essemble_core.min.js',
  //   'bower_components/custom-select-menu/custom-select-menu.jquery.js',
  //   'src/assets/js/_taxonomy/glossary.js'
  // ]
};

// Delete the "dist" folder
// This happens every time a build starts
gulp.task('clean', function(done) {
  rimraf('dist', done);
});

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
gulp.task('copy', function() {
  gulp.src(PATHS.assets)
    .pipe(gulp.dest('dist/assets'));
});

// Copy page templates into finished HTML files
gulp.task('pages', function() {
  gulp.src('src/pages/**/*.{html,hbs,handlebars}')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      partials: 'src/partials/',
      data: 'src/data/',
      helpers: 'src/helpers/'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('pages:reset', function(cb) {
  panini.refresh();
  gulp.run('pages');
  cb();
});

gulp.task('styleguide', function(cb) {
  sherpa('src/styleguide/index.md', {
    output: 'dist/styleguide.html',
    template: 'src/styleguide/template.html'
  }, cb);
});

// Compile Sass into CSS
// In production, the CSS is compressed
gulp.task('sass', function() {
  var uncss = $.if(isProduction, $.uncss({
    html: ['src/**/*.html'],
    ignore: [
      new RegExp('^meta\..*'),
      new RegExp('^\.is-.*')
    ]
}));

  var minifycss = $.if(isProduction, $.minifyCss());

  return gulp.src('src/assets/scss/juju.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe(uncss)
    .pipe(minifycss)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest('dist/assets/css'));
});

// Combine Base JavaScript into one file
// In production, the file is minified
gulp.task('javascript', function() {
  var uglify = $.if(isProduction, $.uglify()
    .on('error', function (e) {
      console.log(e);
    }));

  return gulp.src(PATHS.javascript)
    .pipe($.sourcemaps.init())
    // .pipe(strip())
    // .pipe($.babel())
    // .pipe($.babel({
    //         ignore: 'bower_components/jquery-scrollto/src/documents/lib/jquery-scrollto.js'
    //     }))
    .pipe($.concat('juju.js'))
    .pipe(uglify)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest('dist/assets/js'));
});

// Combine Glossary JavaScript into one file
// In production, the file is minified
// gulp.task('glossary', function() {
//   var uglify = $.if(isProduction, $.uglify()
//     .on('error', function (e) {
//       console.log(e);
//     }));

//   return gulp.src(PATHS.glossary)
//     .pipe($.sourcemaps.init())
//     // .pipe($.babel())
//     .pipe($.concat('glossary.js'))
//     .pipe(uglify)
//     .pipe($.if(!isProduction, $.sourcemaps.write()))
//     .pipe(gulp.dest('dist/assets/js'));
// });

gulp.task('json', function() {
  return gulp.src(PATHS.json)
    .pipe(gulp.dest('dist/assets/json'));
});

// gulp.task('async', function() {
//   return gulp.src(PATHS.async)
//     .pipe($.concat('async.js'))
//     .pipe(gulp.dest('dist/assets/js'))
// });

// Copy images to the "dist" folder
// In production, the images are compressed
gulp.task('images', function() {
  var imagemin = $.if(isProduction, $.imagemin({
    progressive: true
  }));

  return gulp.src('src/assets/img/**/*')
    .pipe(imagemin)
    .pipe(gulp.dest('dist/assets/img'));
});

// Build the "dist" folder by running all of the above tasks
gulp.task('build', function(done) {
  sequence('clean', ['pages', 'sass', 'javascript', 'json', 'images', 'copy'], 'styleguide', done);
  // sequence('clean', ['pages', 'sass', 'javascript', 'async', 'json', 'images', 'copy'], 'styleguide', done);
});

// Start a server with LiveReload to preview the site in
gulp.task('server', ['build'], function() {
  browser.init({
    server: 'dist', port: PORT
  });
});

// Build the site, run the server, and watch for file changes
gulp.task('default', ['build', 'server'], function() {
  gulp.watch(PATHS.assets, ['copy', browser.reload]);
  gulp.watch(['src/pages/**/*.html'], ['pages', browser.reload]);
  gulp.watch(['src/{layouts,partials}/**/*.html'], ['pages:reset', browser.reload]);
  gulp.watch(['src/assets/scss/**/*.scss'], ['sass', browser.reload]);
  gulp.watch(['src/assets/js/**/*.js'], ['javascript', browser.reload]);
  // gulp.watch(['src/assets/js/async.js'], ['async', browser.reload]);
  gulp.watch(['src/assets/js/_Krishnaglossary/data/klossary.json'], ['json', browser.reload]);
  gulp.watch(['src/assets/img/**/*'], ['images', browser.reload]);
  gulp.watch(['src/styleguide/**'], ['styleguide', browser.reload]);
});
