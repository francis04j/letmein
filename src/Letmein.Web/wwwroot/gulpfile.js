﻿/// <binding AfterBuild='babel, concat-uglify' />
'use strict';
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const argv = require('yargs').argv;
var gutil = require('gulp-util');

gulp.task('default', ['babel', 'concat-uglify']);

gulp.task('babel', () => {

	// Use babeljs on the letmein javascript to transcode it from ECMAScript
	return gulp
		.src('js/letmein.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('js/prod', { overwrite: true }));
});

gulp.task('concat-uglify', () => {

	var destFilename = `letmein.${argv.docker_tag}.min.js`;
	gutil.log(`Filename: "${destFilename}"`);

	return gulp
		.src(['js/libraries/jquery-3.1.1.min.js',
			'js/libraries/bootstrap.min.js',
			'js/libraries/bootbox.min.js',
			'js/libraries/clipboard.min.js',
			'js/libraries/jquery.countdown.min.js',
			'js/libraries/jquery.toast.js',
			'js/libraries/sjcl.js',
			'js/prod/letmein.js'
		])
		.pipe(concat(destFilename))
		.pipe(uglify())
		.pipe(gulp.dest('js/prod'));
});