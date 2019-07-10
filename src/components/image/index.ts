Component({
  externalClasses: ['v-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      value: ''
    },
    mode: {
      type: String,
      value: 'cover'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    someData: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    customMethod: function() {}
  }
})
