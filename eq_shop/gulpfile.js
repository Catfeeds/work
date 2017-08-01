//引入gulp
var gulp = require('gulp');

//引入组件
var jshint = require('gulp-jshint');//用于检测js是否有错误
var sass = require('gulp-sass');//sass
var concat = require('gulp-concat');//合并文件
var uglify = require('gulp-uglify');//压缩
var rename = require('gulp-rename');//重命名
var cleanCSS = require('gulp-clean-css');//压缩css
var livereload = require('gulp-livereload');//实时刷新
var connect = require('gulp-connect');//服务器连接
//var imagemin = require('gulp-imagemin');//压缩图片
//var connect = require('gulp-rename'); gulp http 服务器插件


gulp.task('change', function () {    // 这里的watch，是自定义的，写成live或者别的也行
    var server = livereload();
    
    // app/**/*.*的意思是 app文件夹下的 任何文件夹 的 任何文件
    gulp.watch('*.*', function (file) {
        server.changed(file.path);
    });
});



//检测js代码是否有错
gulp.task('check',function () {
	gulp.src('libs/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
});


//合并压缩js文件
gulp.task('minjs',function(){
	gulp.src('js/*.js') //目标该目录下的有js 文件
		.pipe(concat('all.js'))//需要合并的文件
		.pipe(gulp.dest('libs/js'))//合并成功后的文件存放目录
		.pipe(rename('all.min.js'))//合并成功后的文件改名
		.pipe(uglify())//压缩
		.pipe(gulp.dest('libs/js'));//把压缩好的文件存放到该目录
});

//压缩图片
gulp.task('img',function(){
	gulp.src('img/*.{png,jpg,gif,ico}')//操作路径
		.pipe(imagemin())
		.pipe(gulp.dest('libs/img'))
})
// gulp.task('img',function(){
// 	gulp.src('libs/img/*.{png,jpg,gif,ico}')
// 		.pipe(imagemin())
// 		.pipe(gulp.dest('libs/js'))
// })



//sass
gulp.task('sass',function(){
	gulp.src('dist/css/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('libs/css'))
})

//压缩css
gulp.task('mincss',function(){
	return gulp.src('libs/css/*.css')
		.pipe(rename({ suffix:'.min' }))
		.pipe(cleanCSS({compatibilty:'ie7'}))//执行压缩
		.pipe(gulp.dest('libs/css'))
})

//监视代码变化
gulp.task('watch',function() {
	//gulp.watch(['dist/js/*.js'],['minjs']);
	//gulp.watch(['dist/css/*.scss'],['sass']);
	gulp.watch(['libs/css/*.css'],['reload']);
})

gulp.task('reload',function() {
	gulp.src('*.html')
	.pipe(livereload())
})


//默认任务
/*gulp.task('default',function() {
	gulp.run('watch')
})*/

gulp.task('webserver', function () {
    connect.server();
});
 
gulp.task('default', ['webserver']);

 

