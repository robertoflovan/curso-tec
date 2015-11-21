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
		output: './build/css',
		watch: './src/styles/*.styl'
	},
	htmls: {
		main: './src/index.jade',
		output: './build',
		watch: './src/*.jade'
	},
	scripts: {
		main: './src/scripts/app.js',
		output: './build/js',
		watch: './src/scripts/*.js'
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
			.pipe(gulp.dest(config.styles.output))
			.pipe(livereload());
});

gulp.task('server', function(){
	gulp
		.src('./build')
		.pipe(webserver({
			host: '0.0.0.0',
			port: 8080
	}));
});


gulp.task('build:html', function(){
	gulp
		.src(config.htmls.main)
		.pipe(jade({
			pretty: true
			}))
		.pipe(gulp.dest(config.htmls.output))
		.pipe(livereload());
});


gulp.task('build:js', function(){
	gulp
		.src(config.scripts.main)
		.pipe(uglify())
		.pipe(gulp.dest(config.scripts.output))
		.pipe(livereload());
});

gulp.task('clean', function(){
	return gulp
				.src('./build', {read:false})
				.pipe(clean({force:true}));
});


//Observa los cambios tanto en html css y javaScript
gulp.task('watch', function(){
	livereload.listen();
	gulp.watch(config.styles.watch, ['build:css']);
	gulp.watch(config.scripts.watch, ['build:js']);
	gulp.watch(config.htmls.watch, ['build:html']);
	})

//Tarea de default
gulp.task('default',['clean', 'server','watch'],function(){
	gulp
		.start('build:css','build:js','build:html')
})