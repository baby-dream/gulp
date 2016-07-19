var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var concatcss = require('gulp-concat-css');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
var open = require('gulp-open');
//消息通知
var notify = require("gulp-notify");

//如果任务名称为default，就是默认任务，直接在控制台输入gulp就可以运行了
//第二个参数就是把其他任务里面的js代码执行一遍，但是他不管你什么什么时候执行完毕
// default中的依赖任务是会同时进行的，谁先执行完是看执行速度。如果有异步任务用了cb()或者return stream，
// 那么他会等依赖任务执行完毕之后再执行default中任务函数
gulp.task("default",["clean","js","css","minifyHtml","images"],function(){
    gulp.src('dist/index.html')
    .pipe(open({app:"chrome"}))
  .pipe(notify("项目构建完成！"));
});

//监视文件变化
gulp.task("watch",function(){
     gulp.watch("src/js/*.js",["task2"]);
});



//删除文件和文件夹
gulp.task("clean",function(cb){
    //如果直接给dist的目录，项目启动的顺序还有清除的结果会报错，所以要写的更详细一些
    del(["dist"]);
    del(["dist/js","dist/css","dist/images"]);
    cb();
})

//合并js文件
gulp.task("js",function(){
   return gulp.src("src/js/*.js")
   .pipe(concat("all.js"))
    .pipe(uglify())
   // .pipe(rename({
   //      // basename: "js",
   //      prefix: "prefix-",
   //      suffix: "-min",
   //      extname: ".js"
   //  }))
   .pipe(gulp.dest("dist/js"));

});

//合并和压缩css文件
gulp.task("css",function(){
  return  gulp.src("src/css/*.css")
   .pipe(concatcss("all.css"))
   .pipe(cssnano())
   .pipe(gulp.dest("dist/css"));
});

//压缩html文件
gulp.task('minifyHtml', function() {
    var opts = {comments:true,spare:true};
 return  gulp.src('src/*.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('dist'))
});

//压缩图片
gulp.task('images', function() {
 return  gulp.src('src/images/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
});


//异步任务的两种处理方式
// gulp.task("task1",function(cb){
//     setTimeout(function(){
//         console.log("task1");
//         cb();
//     },3000)
// });

// gulp.task("task2",function(cb){
//     var stream = gulp.src("src/**/*.js")
//     .pipe(gulp.dest("dist"))
//       return stream;
// });