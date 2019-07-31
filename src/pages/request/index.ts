import Index from '../../models/index'

const index = new Index()
Page({
  data: {},
  onLoad() {
    index.getIndexData().then(res => {
      console.log(res)
    })
  },
  methods: {}
})
