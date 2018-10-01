import {
  ClassicModel
} from '../../models/classic.js'

const classicModel = new ClassicModel()

Component({

  /**
   * 页面的初始数据
   */

  properties: {
    cid: Number,
    type: Number
  },

  data: {
    classic: null,
    latest: true,
    first: false
  },

  /**
   * 生命周期函数--监听页面加载
   */

  attached(options) {
    const cid = this.properties.cid
    const type = this.properties.type
    if (!cid) {
      classicModel.getLatest((res) => {
        this.setData({
          classic: res
        })
      })
    }
    else{
      classicModel.getById(cid, type,res=>{
        this.setData({
          classic: res
        }) 
      })
    }
  },

  methods: {
    onNext: function (event) {
      this._updateClassic('next')
    },

    onPrevious: function (event) {
      this._updateClassic('previous')
    },

    _updateClassic: function (nextOrPrevious) {
      const index = this.data.classic.index
      classicModel.getClassic(index, nextOrPrevious, (res) => {
        this.setData({
          classic: res,
          latest: classicModel.isLatest(res.index),
          first: classicModel.isFirst(res.index)
        })
      })
    },

  }
})