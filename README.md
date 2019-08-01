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

# 需要在小程序开发工具里【工具】-【构建npm】 （如果使用到npm ）

# 打包代码
npm run build
```

## 项目结构

```
.
├── dist                   //编译之后的项目文件（带 sorcemap，支持生产环境告警定位
├── README.md              //项目说明
├── gulpfile.js            // gulp 配置
├── package.json           // 项目说明和开发依赖
├── project.config.json    // 小程序 配置
├── src
│   ├── app.json
│   ├── app.less           //小程序全局样式
│   ├── app.ts             //小程序起始文件
│   ├── components         // 组件
│   ├── config             // 配置
│   ├── models             // 接口模型
│   ├── filter             // 过滤器
│   ├── templates          // 模版
│   ├── images             // 图片
│   ├── pages              // 页面
│   │   ├── index          // 首页
│   │   ├── logs           // 日志页
│   │   └── request        // 简单调用接口页面
│   └── utils              // 工具方法
├── tsconfig.json          // typescript配置
├── tslint.json            // 代码风格配置
├── typings                // ts typings
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

## [npm 使用](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)

从小程序基础库版本 2.2.1 或以上、及开发者工具 1.02.1808300 或以上开始，小程序支持使用 npm 安装第三方包。

此文档要求开发者们对 npm 有一定的了解，因此不会再去介绍 npm 的基本功能。如若之前未接触过 npm，请翻阅官方 npm 文档进行学习。

#### 使用方法 （以[miniprogram-computed](https://github.com/wechat-miniprogram/computed)为例）

[miniprogram-computed](https://github.com/wechat-miniprogram/computed)小程序自定义组件扩展 behavior，计算属性 computed 和监听器 watch 的实现。在 data 或者 properties 改变时，会重新计算 computed 字段并触发 watch 监听器。

- 安装

```sh
# 由于一些原因 请不要使用 --save-dev
npm install --save miniprogram-computed
```

- 作为 behavior 使用

```ts
const computedBehavior = require('miniprogram-computed')
Component({
  behaviors: [computedBehavior],
  properties: {
    propA: {
      type: Number,
      value: 0
    }
  },
  data: {
    a: 0,
    b: {
      c: {
        d: 33
      },
      e: [1, 2, [3, 4]]
    }
  },
  watch: {
    propA(val: any, oldVal: any) {
      console.log('propA new: %s, old: %s', val, oldVal)
    },
    a(val: any, oldVal: any) {
      console.log('a new: %s, old: %s', val, oldVal)
    },
    'b.c.d': function(val: any, oldVal: any) {
      console.log('b.c.d new: %s, old: %s', val, oldVal)
    },
    'b.e[2][0]': function(val: any, oldVal: any) {
      console.log('b.e[2][0] new: %s, old: %s', val, oldVal)
    },
    'b.e[3][4]': function(val: any, oldVal: any) {
      console.log('b.e[3][4] new: %s, old: %s', val, oldVal)
    }
  },
  computed: {
    sum(data: any) {
      // 注意： computed 函数中不能访问 this ，只有 data 对象可供访问
      // 这个函数的返回值会被设置到 this.data.sum 字段中
      return data.a + data.propA
    }
  },
  methods: {
    handleTap() {
      this.setData!({
        a: ++(this as any).data.a,
        'b.c.d': 3,
        'b.e[2][0]': 444,
        c: 123
      })
      this.triggerEvent!('update', {}, {})
    }
  }
})
```

代码来源[miniprogram-computed](https://github.com/wechat-miniprogram/computed)

注意 ⚠️： 使用前需要先构建 [工具] => [构建 npm]
