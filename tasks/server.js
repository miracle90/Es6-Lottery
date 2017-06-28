import gulp from 'gulp';
import gulpif from 'gulp-if';
import liveserver from 'gulp-live-server';
import args from './util/args';

gulp.task('serve',(cb)=>{
  if(!args.watch) return cb();
  // 创建一个服务器，harmony：要在当前命令行下执行脚本
  var server = liveserver.new(['--harmony','server/bin/www']);
  server.start();
  // 热更新，文件监听
  gulp.watch(['server/public/**/*.js','server/views/**/*.ejs'],function(file){
    server.notify.apply(server,[file]);
  })
  // 需要监听重启服务的文件
  gulp.watch(['server/routes/**/*.js','server/app.js'],function(){
    server.start.bind(server)()
  });
})
