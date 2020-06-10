小程序 Start

- 使用 [gulp](https://gulpjs.com/) 构建（支持 [typescript](https://www.typescriptlang.org/) 和 [less](http://lesscss.org/) 或 [sass](https://sass-lang.com/) 或 css）
- 使用 [typescript](https://www.typescriptlang.org/) 编译
- 使用 [tslint](https://palantir.github.io/tslint/) + [prettier](https://prettier.io/) 格式代码规范
- <del>使用 [miniprogram-api-typings](https://www.npmjs.com/package/miniprogram-api-typings) 微信小程序 API 的 `TypeScript` 类型定义文件</del>
- 下载 [miniprogram-api-typings](https://www.npmjs.com/package/miniprogram-api-typings) 微信小程序 API 的 `TypeScript` 类型定义文件,复制类型文件放置在 `typings` 文件下

- [`./typings/lib.wx.qy.api.d.ts`](./typings/lib.wx.qy.api.d.ts) 企业微信小程序 api

```sh
# 安装依赖
npm install

# 全局安装依赖 (不是必须的)
npm install gulp prettier typescript --global

# 启动代码
npm run dev

# 需要在小程序开发工具里【工具】-【构建npm】 （如果使用到npm ）

# 打包测试代码
npm run build:release

# 打包代码
npm run build
```

## 路由

```js
{
  "pages": [
    "pages/index/index", // 首页 获取用户头像
    "pages/request/index", // request 简单调用接口页面
    "pages/logs/index",  // logs demo
    "pages/style/index", // 样式 demo
    "pages/lifecycle/index", // 生命周期 demo
    "pages/qywx/index" // 企业微信小程序 demo
  ]
}
```

## 项目结构

```
.
├── dist // 编译之后的项目文件（带 sorcemap，支持生产环境告警定位)
├── src
│   ├── app.json // 小程序全局配置
│   ├── app.scss // 小程序全局样式
│   ├── app.ts // 小程序起始文件
│   ├── components // 组件
│   ├── config // 配置
│   │   └── env.ts // 存储环境变量文件 （格式固定不要试图改动）
│   ├── models // 接口模型
│   ├── filter // 过滤器
│   ├── templates // 模版
│   ├── images // 图片
│   ├── types // 自定义的 types
│   ├── pages // 页面
│   │   ├── index // 首页
│   │   ├── logs // 日志页
│   │   └── request // 简单调用接口页面
│   │   └── lifecycle // 小程序生命周期页面
│   │   └── qywx // 企业微信小程序页面
│   └── utils // 工具方法
├── README.md // 项目说明
├── gulpfile.js // gulp 配置
├── package.json // 项目说明和开发依赖
├── project.config.json // 小程序 配置
├── tsconfig.json // typescript 配置
├── tslint.json // 代码风格配置
├── typings //ts typings 当前文件没有微信小程序 types，类型使用 miniprogram-api-typings，微信开发者工具会提示报错
│   └── index.d.ts

```

**注意：`package.json`中的`dependencies`字段，依赖的包会被自动打包到`dist`里。**

## 环境变量说明

从`@1.2.4`开始支持环境变量, 变量存储在`src/config/env.ts`中.

- 运行 `npm run dev` 或者`npm run start` 时, 环境变量会替换为`development`
- 运行 `npm run build:release` 时, 打包测试环境,环境变量会替换为`release`
- 运行 `npm run build`, 打包正试环境,环境变量会替换为`production`

说明： `src/config/env.ts`中的值会在`gulp-typescript`编译之前被替换成当前`process.env.NODE_ENV`对应的值

## 公共库使用说明

## 规范

- 公共模块写成组件 组件使用定义 `"v-like": "../../components/like/index"` 所组件定义使用`v-`开头
- 组件的`externalClasses`(外部类) 命名属性都使用`v-class`
- 页面布局一律使用 flex 布局

## npm 使用

- 安装 npm 以`wxml-to-canvas`为列

```sh
npm install wxml-to-canvas
```

- 微信小程序[npm](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)支持, (工具 --> 构建 npm， 勾选“使用 npm 模块”选项， 构建完成后即可使用 npm 包。)

- 使用

```json
{
  "usingComponents": {
    "wxml-to-canvas": "wxml-to-canvas"
  }
}
```

## 框架扩展

[computed](https://developers.weixin.qq.com/miniprogram/dev/extended/utils/computed.html)
