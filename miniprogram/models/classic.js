import {
    HTTP
}
from '../util/http.js'

class ClassicModel extends HTTP {
    getLatest(sCallback) {
        const db = wx.cloud.database()
        db.collection('qzmusic').where({  
        }).get({
          success: res => {
            sCallback(res.data[0])
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '查询记录失败'
            })
          }
        })
    }

    getClassic(index, nextOrPrevious, sCallback) {
        // 缓存中寻找 or API 写入到缓存中
        // key 确定key
        let key = nextOrPrevious == 'next' ?
            this._getKey(index + 1) : this._getKey(index - 1)
        let i = nextOrPrevious == 'next' ? index + 1 : index - 1
        console.log(nextOrPrevious)
        let classic = wx.getStorageSync(key)
        if (!classic) {
            const db = wx.cloud.database()
            db.collection('qzmusic').where({
                index: i
            }).get({
            success: res => {
                sCallback(res.data[0])
                console.log(res.data[0])
            },
            fail: err => {
            }
            })
        } else {
            sCallback(classic)
        }
    }

    isFirst(index) {
        return index == 1 ? true : false
    }

    isLatest(index) {
        let latestIndex = this._getLatestIndex()
        return latestIndex == index ? true : false
    }


    getMyFavor(success) {
        const params = {
            url: 'classic/favor',
            success: success
        }
        this.request(params)
    }

    getById(cid, type, success) {
        let params = {
            url: `classic/${type}/${cid}`,
            success: success
        }
        this.request(params)
    }

    _setLatestIndex(index) {
        wx.setStorageSync('latest', index)
    }

    _getLatestIndex() {
        const index = wx.getStorageSync('latest')
        return index
    }

    _getKey(index) {
        const key = 'classic-' + index
        return key
    }
}


export {
    ClassicModel
}