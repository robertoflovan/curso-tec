var gulp = require('gulp');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');


var webserver = require('gulp-webserver');//Levanta un servidor local
var livereload = require('gulp-livereload');//Actualiza el navegador automaticamente


//////////////////////Stylus//////////////////////
var stylus = require('gulp-stylus');//Permite compliar styl
var nib = require('nib');//Agrega prefijos a los atributos css
var minifyCSS = require('gulp-minify-css');//Minifica los css

////////////////JS///////////////////
var uglify = require('gulp-uglify') //Minificar JS

///////////////////Jade////////////////////
var jade = require('gulp-jade');

////////////////////Borrar la carpeta public cada vez que trabaje gulp/////////////
var clean = require('gulp-rimraf')


var config = {
	styles: {
		main: './src/styles/app.styl',
		output: './build/css'
	},
	htmls: {
		main: './src/index.jade',
		output: './build'
	},
	scripts: {
		main: './src/scripts/app.js',
		output: './build/js'
	}
}


gulp.task('build:css', function(){
	gulp
		.src(config.styles.main)
		.pipe(stylus({
			use: nib(),
			'include css': true
			}))
			.pipe(minifyCSS())
			.pipe(gulp.dest(config.styles.output));
});


gulp.task('build:html', function(){
	gulp
		.src(config.htmls.main)
		.pipe(jade({
			pretty: true
			}))
		.pipe(gulp.dest(config.htmls.output));
});

gulp.task('build:js', function(){
	gulp
		.src(config.scripts.main)
		.pipe(uglyfy())
		.pipe(gulp.dest(config.scripts.output));
});

