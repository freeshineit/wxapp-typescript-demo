const gulp = require('gulp')
const path = require('path')
const rename = require('gulp-rename')
const less = require('gulp-less')
const postcss = require('gulp-postcss')
const sass = require('gulp-sass')
const imagemin = require('gulp-imagemin')
const changed = require('gulp-changed')
const autoprefixer = require('autoprefixer')
const clear = require('gulp-clean')
const del = require('del')
const ts = require('gulp-typescript')
const tsProject = ts.createProject('tsconfig.json')
const sourcemaps = require('gulp-sourcemaps')
const jsonTransform = require('gulp-json-transform')
const gulpif = require('gulp-if')
const projectConfig = require('./package.json')
sass.compiler = require('node-sass')

//项目路径
const option = {
  base: 'src',
  allowEmpty: true
}
// compile 目录
const dist = __dirname + '/dist'
// 复制不包含less、scss、sass、css、ts和图片的文件
const copyPath = [
  'src/**/!(_)*.*',
  '!src/**/*.{less,scss,sass,css}',
  '!src/**/*.ts',
  '!src/**/*.{png,jpg,jpeg,gif,ico,svg}'
]
const imagePath = [
  'src/images/**/*.{png,jpg,jpeg,gif,ico,svg}',
  'src/components/**/*.{png,jpg,jpeg,gif,ico,svg}'
]
// less
const lessPath = ['src/**/*.less', 'src/app.less']
// scss sass
const sassPath = ['src/**/*.{scss,sass}', 'src/app.{scss,sass}']
// css
const cssPath = ['src/**/*.css', 'src/app.css']
// ts
const tsPath = ['src/**/*.ts', 'src/app.ts']

// --------------------清空目录--------------------------------
gulp.task('clearTask', () => {
  return gulp.src(dist, { allowEmpty: true }).pipe(clear())
})

// ---------------------------------------------------------

// --------------复制不包含less、scss、sass、css、ts和图片的文件------------------
gulp.task('copyTask', () => {
  return gulp.src(copyPath, option).pipe(gulp.dest(dist))
})

// 复制不包含less、scss、sass、css、ts和图片的文件(只改动有变动的文件）
gulp.task('copyChangeTask', () => {
  return gulp
    .src(copyPath, option)
    .pipe(changed(dist))
    .pipe(gulp.dest(dist))
})
// -------------------------------------------------------------------

// --------------------增加dependencies--------------------------------

var dependencies = (projectConfig && projectConfig.dependencies) || {} // dependencies配置

const nodeModulesCopyPath = ['node_modules/**/*']
//项目路径
const copyNodeModuleOption = {
  base: '.',
  allowEmpty: true
}

//复制依赖的node_modules文件
gulp.task('copyNodeModules', cb => {
  if (Object.keys(dependencies).length > 0) {
    //   https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html
    console.log('-------小程序依赖npm 请在微信开发者工具中构建npm--------')
    return gulp
      .src(nodeModulesCopyPath, copyNodeModuleOption)
      .pipe(gulp.dest(dist))
  } else {
    return cb()
  }
})
//复制依赖的node_modules文件(只改动有变动的文件）
gulp.task('copyNodeModulesChange', () => {
  // https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html
  console.log('-------小程序依赖npm 请在微信开发者工具中构建npm--------')
  return gulp
    .src(nodeModulesCopyPath, copyNodeModuleOption)
    .pipe(changed(dist))
    .pipe(gulp.dest(dist))
})

// 根据denpende生成package.json
gulp.task('generatePackageJson', cb => {
  return Object.keys(dependencies).length > 0
    ? gulp
        .src('./package.json')
        .pipe(
          jsonTransform(function(data, file) {
            return {
              desc: '小程序使用npm的依赖, 使用前请先构建npm, 工具 => 构建npm',
              dependencies: dependencies
            }
          })
        )
        .pipe(gulp.dest(dist))
    : cb()
})

// -------------------------------------------------------------------

// -----------------------样式 less scss sass css-----------------------
// 编译less
gulp.task('lessTask', () => {
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

// 编译less(只改动有变动的文件）
gulp.task('lessChangeTask', () => {
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

// 编译sass scss
gulp.task('sassTask', () => {
  return gulp
    .src(sassPath, option)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer]))
    .pipe(
      rename(function(path) {
        path.extname = '.wxss'
      })
    )
    .pipe(gulp.dest(dist))
})

// 编译sass scss(只改动有变动的文件）
gulp.task('sassChangeTask', () => {
  return gulp
    .src(sassPath, option)
    .pipe(changed(dist))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer]))
    .pipe(
      rename(function(path) {
        path.extname = '.wxss'
      })
    )
    .pipe(gulp.dest(dist))
})

// 编译css
gulp.task('cssTask', () => {
  return gulp
    .src(cssPath, option)
    .pipe(postcss([autoprefixer]))
    .pipe(
      rename(function(path) {
        path.extname = '.wxss'
      })
    )
    .pipe(gulp.dest(dist))
})

// 编译css(只改动有变动的文件）
gulp.task('cssChangeTask', () => {
  return gulp
    .src(cssPath, option)
    .pipe(changed(dist))
    .pipe(postcss([autoprefixer]))
    .pipe(
      rename(function(path) {
        path.extname = '.wxss'
      })
    )
    .pipe(gulp.dest(dist))
})
// -------------------------------------------------------------------

// -----------------------复制压缩image-------------------------------------
// 压缩image
gulp.task('imagesTask', () => {
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
// --------------------------- ts编译 --------------------------------------
// 编译 ts
gulp.task('tsTask', function() {
  return tsProject
    .src()
    .pipe(gulpif(process.env.NODE_ENV === 'development', sourcemaps.init()))
    .pipe(tsProject())
    .js.pipe(sourcemaps.write())
    .pipe(gulp.dest(dist))
})

gulp.task('tsChangeTask', function() {
  return tsProject
    .src()
    .pipe(changed(tsPath))
    .pipe(gulpif(process.env.NODE_ENV === 'development', sourcemaps.init()))
    .pipe(tsProject())
    .js.pipe(sourcemaps.write())
    .pipe(gulp.dest(dist))
})
// --------------------------- end ts编译 ----------------------------------------

//监听
gulp.task('watch', () => {
  gulp.watch(tsPath, gulp.series('tsChangeTask')) // Change ts
  gulp.watch(lessPath, gulp.series('lessChangeTask')) // Change less
  gulp.watch(sassPath, gulp.series('sassChangeTask')) // Change sass
  gulp.watch(cssPath, gulp.series('cssChangeTask')) // Change css

  var watcher = gulp.watch(copyPath, gulp.series('copyChangeTask'))
  Object.keys(dependencies).length > 0 &&
    gulp.watch(nodeModulesCopyPath, gulp.series('copyNodeModulesChange'))

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
    'clearTask',
    gulp.parallel(
      'copyTask',
      'copyNodeModules',
      'generatePackageJson',
      'lessTask',
      'sassTask',
      'cssTask',
      'imagesTask',
      'tsTask'
    ),
    'watch'
  )
)

//上线
gulp.task(
  'build',
  gulp.series(
    // sync
    'clearTask',
    gulp.parallel(
      // async
      'copyTask',
      'copyNodeModules',
      'generatePackageJson',
      'lessTask',
      'sassTask',
      'cssTask',
      'imagesTask',
      'tsTask'
    )
  )
)
