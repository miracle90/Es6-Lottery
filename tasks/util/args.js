// 处理命令行参数
import yargs from 'yargs';
// 区分开发环境与线上环境
const args = yargs

	.option('production', {
		boolean: true,
		default: false,
		describe: 'min all scripts'
	})

	.option('watch', {
		boolean: true,
		default: false,
		describe: 'watch all scripts'
	})

	.option('verbose', {
		boolean: true,
		default: false,
		describe: 'log'
	})

	.option('sourcemaps', {
		describe: 'force the creation of sourcemaps'
	})

	.option('port', {
		string: true,
		default: 8080,
		describe: 'server port'
	})

	.argv

export default args;

	