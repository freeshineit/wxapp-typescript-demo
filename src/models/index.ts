// this is models module
import Request from '../utils/request'
class Index extends Request {
  constructor() {
    super()
  }

  public getIndexData() {
    return this.request({
      url: ''
    })
  }
}

export default Index
