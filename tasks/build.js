import gulp from 'gulp';
// 处理包的顺序问题
import gulpSequence from 'gulp-sequence';

// serve放在最后面执行
gulp.task('build', gulpSequence('clean','css','pages','scripts',['browser','serve']));
