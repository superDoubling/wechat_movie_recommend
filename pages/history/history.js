var config = require('../../comm/script/config')
var filmNullTip = {
      tipText: '暂无浏览记录喔',
      actionText: '去逛逛',
      routeUrl: '../../pages/popular/popular',
      openType: "switchTab"
    }
var personNullTip = {
      tipText: '亲，找不到人物的浏览记录',
      actionText: '去逛逛',
      routeUrl: '../../pages/popular/popular'
    }
Page({
  data:{
    film_history: [],
    person_history: [],
    nullTip: filmNullTip,
    showLoading:true
  },
  onLoad:function(options){
    var that = this
    wx.request({
      url: config.apiList.getHistoryByUname,
      data: {
        uname: getApp().globalData.userInfo.nickName
      },
      success: function (res) {
        console.log(res.data.subjects);
        that.setData({
          film_history: res.data.subjects,
          showLoading:false
        });
      }
    })
    wx.stopPullDownRefresh()
  },
	onPullDownRefresh: function() {
    var that = this
    wx.request({
      url: config.apiList.getHistoryByUname,
      data: {
        uname: getApp().globalData.userInfo.nickName
      },
      success: function (res) {
        console.log(res.data.subjects);
        that.setData({
          film_history: res.data.subjects
        });
      }
    })
    wx.stopPullDownRefresh()
	},
  viewFilmDetail: function(e) {
		var data = e.currentTarget.dataset
    wx.navigateTo({
			url: "../filmDetail/filmDetail?mid=" + data.mid
		})
  },
  viewPersonDetail: function(e) {
		var data = e.currentTarget.dataset
		wx.redirectTo({
			url: "../personDetail/personDetail?id=" + data.id
		})
  },
  changeViewType: function(e) {
    var data = e.currentTarget.dataset
    this.setData({
      show: data.type,
      nullTip: data.type == 'film_history' ? filmNullTip : personNullTip
    })
  }
})