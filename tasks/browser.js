import gulp from 'gulp';
import gulpif from 'gulp-if';
// 常用工具，函数集合
import gutil from 'gulp-util';
import args from './util/args';

gulp.task('browser', (cb) => {
	if (!args.watch) return cb();
	// 监听目录，任务，发生修改，自动调用scripts.js文件
	gulp.watch('app/**/*.js', ['scripts']);
	gulp.watch('app/**/*.ejs', ['pages']);
	gulp.watch('app/**/*.css', ['css']);
});