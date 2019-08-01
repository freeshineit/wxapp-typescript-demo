// this is models module
import Request from '../utils/request'
class Index extends Request {
  constructor() {
    super()
  }

  public getIndexData() {
    return this.request({
      url: '/v1/photos?feature=popular'
    })
  }
}

export default Index
