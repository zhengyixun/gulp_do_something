//引入gulp，gulp-babel的npm模块；
var gulp = require('gulp');
var babel = require('gulp-babel'),    //编译ES6,ES7等
    less = require('gulp-less'),     //编译less
    imgmin = require('gulp-imagemin'),   //压缩图片
    uglify = require('gulp-uglify'),  //混淆压缩js
    concat = require('gulp-concat'),   //将多个js压缩到一个js中
    clean = require('gulp-clean'),     //删除文件
    mincss = require('gulp-minify-css'),   //混淆压缩css
    htmlmin = require('gulp-htmlmin');     //压缩html代码

//定义一个babel任务（自定义任务名称）
gulp.task('babel', function () { //‘babel’ gulp的脚本名称，自定义命名
   return gulp.src(['src/1.js','src/2.js']) //js入口文件，可用绝对路径、相对路径，是文件类型
       .pipe(babel())          //运行gulp-babel进行编译
       .pipe(concat('main.js'))   //将 合并后的js输出到main.js中
       .pipe(uglify())     //压缩混淆js代码
       .pipe(gulp.dest('build/js'))  //编译后的文件输出地址，是文件夹类型
});

//定义一个less任务
gulp.task('less_',function () {
   return gulp.src(['src/css/index.less','src/css/index1.less'])
       .pipe(concat('main.css'))
       .pipe(less())
       .pipe(mincss())
       .pipe(gulp.dest('build/css'))
});

//定义一个imgmin任务
gulp.task('imgmin_',function () {
   return gulp.src('src/img/*.{png,jpg,gif,ico}').pipe(imgmin()).pipe(gulp.dest('build/img'))
});

//压缩html代码
gulp.task('html_',function () {

    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
   return gulp.src('src/html/*.html').pipe(htmlmin(options)).pipe(gulp.dest('build/html'))
});

//清空文件夹,确保每次执行gulp都是最新的
gulp.task('clean_',function (cb) {
    return gulp.src(['build/css','build/js','build/img','build/html'],{read:false})
        .pipe(clean())
});

//定义默认任务，通过命令行执行gulp命令若没提供任务名就按此处定义的任务来执行，可以是一次执行多个任务。
gulp.task('default',['clean_','babel','less_','imgmin_','html_']);