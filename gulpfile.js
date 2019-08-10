const gulp = require('gulp')
const path = require('path')
const rename = require('gulp-rename')
const less = require('gulp-less')
const postcss = require('gulp-postcss')
const imagemin = require('gulp-imagemin')
const changed = require('gulp-changed')
const autoprefixer = require('autoprefixer')
const clear = require('gulp-clean')
const del = require('del')
const ts = require('gulp-typescript')
const tsProject = ts.createProject('tsconfig.json')
const sourcemaps = require('gulp-sourcemaps')
const jsonTransform = require('gulp-json-transform')
const projectConfig = require('./package.json')

//项目路径
const option = {
  base: 'src',
  allowEmpty: true
}
const dist = __dirname + '/dist'
const copyPath = [
  'src/**/!(_)*.*',
  '!src/**/*.less',
  '!src/**/*.ts',
  '!src/**/*.{png,jpg,jpeg,gif,ico,svg}'
]
const imagePath = [
  'src/images/**/*.{png,jpg,jpeg,gif,ico,svg}',
  'src/components/**/*.{png,jpg,jpeg,gif,ico,svg}'
]
const lessPath = ['src/**/*.less', 'src/app.less']
const watchLessPath = ['src/**/*.less', 'src/css/**/*.less', 'src/app.less']
const tsPath = ['src/**/*.ts', 'src/app.ts']

//清空目录
gulp.task('clear', () => {
  return gulp.src(dist, { allowEmpty: true }).pipe(clear())
})

//复制不包含less和图片的文件
gulp.task('copy', () => {
  return gulp.src(copyPath, option).pipe(gulp.dest(dist))
})

//复制不包含less和图片的文件(只改动有变动的文件）
gulp.task('copyChange', () => {
  return gulp
    .src(copyPath, option)
    .pipe(changed(dist))
    .pipe(gulp.dest(dist))
})

// 增加dependencies
var dependencies = projectConfig && projectConfig.dependencies // dependencies配置
var nodeModulesCopyPath = []
for (let d in dependencies) {
  nodeModulesCopyPath.push('node_modules/' + d + '/**/*')
}
//项目路径
var copyNodeModuleOption = {
  base: '.',
  allowEmpty: true
}

//复制依赖的node_modules文件
gulp.task('copyNodeModules', cb => {
  return nodeModulesCopyPath.length > 0
    ? gulp.src(nodeModulesCopyPath, copyNodeModuleOption).pipe(gulp.dest(dist))
    : cb()
})
//复制依赖的node_modules文件(只改动有变动的文件）
gulp.task('copyNodeModulesChange', () => {
  return gulp
    .src(nodeModulesCopyPath, copyNodeModuleOption)
    .pipe(changed(dist))
    .pipe(gulp.dest(dist))
})

// 根据denpende生成package.json
gulp.task('generatePackageJson', () => {
  return gulp
    .src('./package.json')
    .pipe(
      jsonTransform(function(data, file) {
        return {
          dependencies: dependencies
        }
      })
    )
    .pipe(gulp.dest(dist))
})

//编译less
gulp.task('less', () => {
  return gulp
    .src(lessPath, option)
    .pipe(
      less().on('error', function(e) {
        console.error(e.message)
        this.emit('end')
      })
    )
    .pipe(postcss([autoprefixer]))
    .pipe(
      rename(function(path) {
        path.extname = '.wxss'
      })
    )
    .pipe(gulp.dest(dist))
})

//编译less(只改动有变动的文件）
gulp.task('lessChange', () => {
  return gulp
    .src(lessPath, option)
    .pipe(changed(dist))
    .pipe(
      less().on('error', function(e) {
        console.error(e.message)
        this.emit('end')
      })
    )
    .pipe(postcss([autoprefixer]))
    .pipe(
      rename(function(path) {
        path.extname = '.wxss'
      })
    )
    .pipe(gulp.dest(dist))
})

// 压缩image
gulp.task('images', () => {
  return gulp
    .src(imagePath, option)
    .pipe(changed(dist))
    .pipe(
      imagemin({
        optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
        progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
        interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
        multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
      })
    )
    .pipe(gulp.dest(dist))
})

// 编译
gulp.task('tsCompile', function() {
  return tsProject
    .src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .js.pipe(sourcemaps.write())
    .pipe(gulp.dest(dist))
})

//监听
gulp.task('watch', () => {
  gulp.watch(tsPath, gulp.series('tsCompile'))
  var watcher = gulp.watch(copyPath, gulp.series('copyChange'))
  nodeModulesCopyPath.length > 0 &&
    gulp.watch(nodeModulesCopyPath, gulp.series('copyNodeModulesChange'))

  gulp.watch(watchLessPath, gulp.series('less')) //Change
  watcher.on('change', function(event) {
    if (event.type === 'deleted') {
      var filepath = event.path
      var filePathFromSrc = path.relative(path.resolve('src'), filepath)
      // Concatenating the 'build' absolute path used by gulp.dest in the scripts task
      var destFilePath = path.resolve('dist', filePathFromSrc)
      // console.log({filepath, filePathFromSrc, destFilePath})
      del.sync(destFilePath)
    }
  })
})

//开发并监听
gulp.task(
  'default',
  gulp.series(
    // sync
    gulp.parallel(
      'copy',
      'copyNodeModules',
      'generatePackageJson',
      'less',
      'images',
      'tsCompile'
    ),
    'watch'
  )
)

//上线
gulp.task(
  'build',
  gulp.series(
    // sync
    'clear',
    gulp.parallel(
      // async
      'copy',
      'copyNodeModules',
      'generatePackageJson',
      'less',
      'images',
      'tsCompile'
    )
  )
)
