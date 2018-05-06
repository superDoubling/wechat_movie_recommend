var config = require('../../comm/script/config')
var filmNullTip = {
  tipText: '暂无收藏的电影喔',
  actionText: '去逛逛',
  routeUrl: '../popular/popular',
  openType: "switchTab"
}
var personNullTip = {
  tipText: '亲，找不到人物的收藏',
  actionText: '去逛逛',
  routeUrl: '../../pages/popular/popular'
}
Page({
  data: {
    film_favorite: [],
    person_favorite: [],
    show: 'film_favorite',
    nullTip: filmNullTip,
    isRequest:false,
    showLoading:true
  },
  onLoad: function (options) {
    var that = this
    wx.request({
      url: config.apiList.getStoreByUname,
      data: {
        uname: getApp().globalData.userInfo.nickName
      },
      success: function (res) {
        that.setData({
          film_favorite: res.data.subjects,
          isRequest:true,
          showLoading:false
        });
      }
    })
    wx.stopPullDownRefresh()
  },
  onPullDownRefresh: function () {
    var that = this
    wx.request({
      url: config.apiList.getStoreByUname,
      data: {
        uname: getApp().globalData.userInfo.nickName
      },
      success: function (res) {
        that.setData({
          film_favorite: res.data.subjects
        });
      }
    })
    wx.stopPullDownRefresh()
  },
  viewFilmDetail: function (e) {
    var data = e.currentTarget.dataset
    wx.navigateTo({
      url: "../filmDetail/filmDetail?mid=" + data.mid
    })
  },
  viewPersonDetail: function (e) {
    var data = e.currentTarget.dataset
    wx.redirectTo({
      url: "../personDetail/personDetail?id=" + data.id
    })
  },
  changeViewType: function (e) {
    var data = e.currentTarget.dataset
    this.setData({
      show: data.type,
      nullTip: data.type == 'film_favorite' ? filmNullTip : personNullTip
    })
  }
})