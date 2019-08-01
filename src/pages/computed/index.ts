Page({
  data: {
    propA: 10
  },
  onLoad() {},
  methods: {},
  handleUpdate() {
    this.setData!({
      propA: ++(this as any).data.propA
    })
  }
})
