小程序 Start

- 使用 gulp 构建（支持 typescript 和 less）
- 使用 typescript 编译
- 使用 tslint + prettier 格式代码规范
- 使用小程序官方 typing 库

```sh
# 安装依赖
npm install

# 全局安装依赖 (不是必须的)
npm install gulp prettier typescript --global

# 启动代码
npm run dev

# 需要在小程序开发工具里【工具】-【构建npm】

# 打包代码
npm run build
```

## 项目结构

```
.
├── dist                   //编译之后的项目文件（带 sorcemap，支持生产环境告警定位
├── README.md               //项目说明
├── gulpfile.js             // gulp 配置
├── package.json           // 项目说明和开发依赖
├── project.config.json    // 小程序 配置
├── src
│   ├── app.json
│   ├── app.less           //小程序全局样式
│   ├── app.ts             //小程序起始文件
│   ├── components         // 组件
│   ├── config             // 配置
│   ├── filter             //  过滤器
│   ├── pages              // 页面
│   │   ├── index
│   ├── templates          //  模版
│   └── utils              // 工具方法
├── tsconfig.json         // typescript配置
├── tslint.json           // 代码风格配置
├── typings               // ts typings
│   ├── declaration.d.ts
│   ├── index.d.ts
│   ├── lib.wa.es6.d.ts
│   └── wx
```

**注意：`package.json`中的`dependencies`字段，依赖的包会被自动打包到`dist`里。**

## 公共库使用说明

## 规范

- 公共模块写成组件 组件使用定义 `"v-like": "../../components/like/index"` 所组件定义使用`v-`开头
- 组件的`externalClasses`(外部类) 命名属性都使用`v-class`
- 页面布局一律使用 flex 布局
