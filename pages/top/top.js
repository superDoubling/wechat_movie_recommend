var douban = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
Page({
  data: {
    films: [],
    hasMore: true,
    showLoading: true,
    start: 0,
    test: "",
    scrollTop: 0

  },
  onLoad: function () {
    var that = this
    douban.fetchFilms.call(that, config.apiList.top, that.data.start)
  },
  onPullDownRefresh: function () {
    var that = this
    that.setData({
      films: [],
      hasMore: true,
      showLoading: true,
      start: 0
    })
    douban.fetchFilms.call(that, config.apiList.top, that.data.start)
  },
  onReachBottom: function () {
    console.log("enter");
    var that = this
    if (!that.data.showLoading) {
      douban.fetchFilms.call(that, config.apiList.top, that.data.start)
    }

  },
  viewFilmDetail: function (e) {
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: "../filmDetail/filmDetail?mid=" + data.mid
    })
  },
  viewFilmByType: function (e) {
    var data = e.currentTarget.dataset
    var keyword = data.type
    wx.navigateTo({
      url: '../searchResult/searchResult?url=' + encodeURIComponent(config.apiList.search.byType) + '&keyword=' + keyword
    })
  },

  //回到顶部按钮
  goTop: function (e) {
    this.setData({
      scrollTop: 0
    })
  },
  scroll: function (e, res) {
    // 容器滚动时将此时的滚动距离赋值给 this.data.scrollTop
    if (e.detail.scrollTop > 500) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },



})