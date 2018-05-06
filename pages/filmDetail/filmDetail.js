var douban = require('../../comm/script/fetch')
var util = require('../../util/util')
var config = require('../../comm/script/config')
Page({
  data: {
    filmDetail: {},
    showLoading: true,
    showContent: false,
    isFilmFavorite: false,
    scoreNum: 0
  },
  onLoad: function (options) {
    var that = this
    var mid = options.mid
    wx.request({
      url: config.apiList.getIsFavorite,
      data: {
        uname: getApp().globalData.userInfo.nickName,
        mid: mid
      },
      success: function (res) {
        that.setData({
          isFilmFavorite: res.data.isFavorite,
          scoreNum: res.data.userScore
        });
      }
    })
    douban.fetchFilmDetail.call(that, config.apiList.filmDetail, mid)
  },

  viewPersonDetail: function (e) {
    var data = e.currentTarget.dataset;
    wx.redirectTo({
      url: '../personDetail/personDetail?id=' + data.id
    })
  },
  viewFilmByType: function (e) {
    var data = e.currentTarget.dataset
    var keyword = data.type
    wx.redirectTo({
      url: '../searchResult/searchResult?url=' + encodeURIComponent(config.apiList.search.byType) + '&keyword=' + keyword
    })
  },
  onPullDownRefresh: function () {
    var data = {
      id: this.data.filmDetail.id
    }
    this.onLoad(data)
  },
  favoriteFilm: function (cb) {
    var that = this
    // 判断原来是否收藏，是则删除，否则添加
    if (cb.currentTarget.dataset.isfilmfavorite) {
      wx.request({
        url: config.apiList.deleteFromStore,
        data: {
          uname: getApp().globalData.userInfo.nickName,
          mid: cb.currentTarget.dataset.mid
        },
        success: function (res) {
          that.setData({
            isFilmFavorite: res.data.isFavorite
          });
        }
      })
    } else {
      wx.request({
        url: config.apiList.addToStore,
        data: {
          uname: getApp().globalData.userInfo.nickName,
          mid: cb.currentTarget.dataset.mid
        },
        success: function (res) {
          that.setData({
            isFilmFavorite: res.data.isFavorite
          });
        }
      })
    }
  },
  changeScore: function (e) {
    var that = this;
    var score = e.target.dataset.index + 1;
    wx.request({
      url: config.apiList.judgeMovie,
      data: {
        uname: getApp().globalData.userInfo.nickName,
        mid: e.target.dataset.mid,
        name: e.target.dataset.name,
        score: score
      },
      success: function (res) {
        wx.showToast({
          title: '打分成功',
          icon: 'success',
          duration: 1000
        })
        that.setData({
          scoreNum: res.data.userScore
        });
      }
    })
  }
})