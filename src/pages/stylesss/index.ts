import Index from '../../models/index'

const index = new Index()
Page({
  data: {
    list: []
  },
  onLoad() {
    index.getIndexData().then((res: any) => {
      this.setData!({
        list: res.data.photos
      })
    })
  },
  methods: {}
})
