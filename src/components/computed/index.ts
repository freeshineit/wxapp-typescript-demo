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
