小程序 Start

- 使用 [gulp](https://gulpjs.com/) 构建（支持 [typescript](https://www.typescriptlang.org/) 和 [less](http://lesscss.org/)）
- 使用 [typescript](https://www.typescriptlang.org/) 编译
- 使用 [tslint](https://palantir.github.io/tslint/) + [prettier](https://prettier.io/) 格式代码规范
- 使用 [miniprogram-api-typings](https://www.npmjs.com/package/miniprogram-api-typings) 微信小程序 API 的 `TypeScript` 类型定义文件

```sh
# 安装依赖
npm install

# 全局安装依赖 (不是必须的)
npm install gulp prettier typescript --global

# 启动代码
npm run dev

# 需要在小程序开发工具里【工具】-【构建npm】 （如果使用到npm ）

# 打包代码
npm run build
```

## 项目结构

```
.
├── dist                   //编译之后的项目文件（带 sorcemap，支持生产环境告警定位
├── src
│   ├── app.json
│   ├── app.scss           // 小程序全局样式 微信开发者工具不支持sass less 文件
│   ├── app.ts             // 小程序起始文件
│   ├── components         // 组件
│   ├── config             // 配置
│   ├── models             // 接口模型
│   ├── filter             // 过滤器
│   ├── templates          // 模版
│   ├── images             // 图片
│   ├── types              // 自定义的types
│   ├── pages              // 页面
│   │   ├── index          // 首页
│   │   ├── logs           // 日志页
│   │   └── request        // 简单调用接口页面
│   └── utils              // 工具方法
├── README.md              // 项目说明
├── gulpfile.js            // gulp 配置
├── package.json           // 项目说明和开发依赖
├── project.config.json    // 小程序 配置
├── tsconfig.json          // typescript配置
├── tslint.json            // 代码风格配置
├── typings   //ts typings 当前文件没有微信小程序types，类型使用miniprogram-api-typings，微信开发者工具会提示报错
│   └── index.d.ts
```

**注意：`package.json`中的`dependencies`字段，依赖的包会被自动打包到`dist`里。**

## 公共库使用说明

## 规范

- 公共模块写成组件 组件使用定义 `"v-like": "../../components/like/index"` 所组件定义使用`v-`开头
- 组件的`externalClasses`(外部类) 命名属性都使用`v-class`
- 页面布局一律使用 flex 布局

### npm 的使用请切换分支[has_npm](https://github.com/freeshineit/wxapp-typescript-start/tree/has_npm)
