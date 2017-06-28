import gulp from 'gulp';
// 做if判断
import gulpif from 'gulp-if';
// 处理文件拼接
import concat from 'gulp-concat';
import webpack from 'webpack';
// gulp处理的都是一些文件流，基于stream
import gulpWebpack from 'webpack-stream';
// 对文件重命名做标识
import named from 'vinyl-named';
// 热更新，自动刷新
import livereload from 'gulp-livereload';
// 处理文件信息流
import plumber from 'gulp-plumber';
// 对文件重命名
import rename from 'gulp-rename';
// 压缩js、css
import uglify from 'gulp-uglify';
// 在命令行工具输出的包，log、色彩
import {log, colors} from 'gulp-util';
// 对命令行参数解析
import args from './util/args';
// 创建一个任务
gulp.task('scripts', () => {
	return gulp.src(['app/js/index.js'])
		// 错误处理
		.pipe(plumber({
			errorHandle: function() {
				//
			}
		}))
		// 对文件重新命名
		.pipe(named())
		// 对js进行编译，借助webpack
		.pipe(gulpWebpack({
			module: {
				loaders: [{
					test: /\.js$/,
					loader: 'babel'
				}]
			}
		// 设置一个null，处理错误的情况
		}), null, (err, stats) => {
			log(`Finished '${colors.cyan('scripts')}'`, stats.toString({
				chunk: false
			}))
		})
		// 指定一个路径，放文件，server中拿到最新的js才能跑起来
		.pipe(gulp.dest('server/public/js'))
		// 重命名
		.pipe(rename({
			basename: 'cp',
			extname: '.min.js'
		}))
		// 压缩
		.pipe(uglify({
			compress: {
				properties: false
			},
			output: {
				'quote_keys': true
			}
		}))
		// 存储
		.pipe(gulp.dest('server/public/js'))
		// 监听文件，自动刷新
		.pipe(gulpif(args.watch, livereload()))
})