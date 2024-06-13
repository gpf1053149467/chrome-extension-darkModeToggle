const gulp = require('gulp');
const watch = require('gulp-watch');
const { exec } = require('child_process');

// 复制所有文件到 dist 文件夹
gulp.task('copy', function() {
  return gulp.src('src/**/*')
    .pipe(gulp.dest('dist'));
});

// 使用 web-ext 运行和重新加载 Chrome 扩展
gulp.task('run', function(done) {
  exec('npx web-ext run --source-dir=dist --target=chromium', function (err, stdout, stderr) {
    console.log('stdout',stdout);
    console.log('stderr', stderr);
    done(err);
  });
});

// 监视文件变化并自动重载
gulp.task('watch', function() {
  watch('src/**/*', gulp.series('copy'));
});

// 默认任务
gulp.task('default', gulp.series('copy', gulp.parallel('run', 'watch')));
