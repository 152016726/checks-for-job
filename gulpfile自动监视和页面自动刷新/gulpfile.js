var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');

//定义livereload任务
gulp.task('webserver', function() {
        connect.server({
            //自动刷新
            livereload: true,
            //开放端口
            port: 904,
        });
    })
    //全局监视
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('index.html');
    gulp.watch('2.html');
})


gulp.task('htmlmin', function() {
    gulp.src(['./*.html'])
        //必须首先watch
        .pipe(watch('./*.html'))
        .pipe(htmlmin({
            collapseWhitespace: true, // 去掉空白字符
            minifyJS: true, //压缩页面JS
            minifyCSS: true, //压缩页面CSS
            removeComments: true //清除HTML注释
        }))
        .pipe(gulp.dest('./lib'))
        //然后再刷新页面
        .pipe(livereload());
});
//添加统一打包的任务

//设定gulp默认任务
gulp.task('default', ['htmlmin', 'webserver']);