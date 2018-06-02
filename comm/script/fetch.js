var config = require('./config.js')
var message = require('../../component/message/message')

// 获取电影列表
function fetchFilms(url, start, count, cb, fail_cb) {
  var that = this
  message.hide.call(that)
  if (that.data.hasMore) {
    wx.request({
      url: url,
      data: {
//        city: config.city,
        start: start,
        count: config.count
      },
      method: 'GET', 
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function(res){
        if(res.data.subjects.length === 0){
          that.setData({
            hasMore: false,
          })
        }else{
          that.setData({
            films: that.data.films.concat(res.data.subjects),
            start: that.data.start + res.data.subjects.length,
            showLoading: false
          })
          console.log(that.data.start);
        }
        wx.stopPullDownRefresh()
        typeof cb == 'function' && cb(res.data)
      },
      fail: function() {
        that.setData({
            showLoading: false
        })
        message.show.call(that,{
          content: '网络开小差了',
          icon: 'offline',
          duration: 3000
        })
        wx.stopPullDownRefresh()
        typeof fail_cb == 'function' && fail_cb()
      }
    })
  }
}

// 获取电影详情
function fetchFilmDetail(url, mid, cb) {
  var that = this;
  message.hide.call(that)
  wx.request({
    url: url,
    data: {
      mid: mid,
    },
    method: 'GET',
    header: {
      "Content-Type": "application/json,application/json"
    },
    success: function(res){
      that.setData({
        filmDetail: res.data.result,
        showLoading: false,
        showContent: true
      })
      wx.setNavigationBarTitle({
        title: res.data.result.name
      })
      wx.stopPullDownRefresh()
      typeof cb == 'function' && cb(res.data)
    },
    fail: function() {
      that.setData({
          showLoading: false
      })
      message.show.call(that,{
        content: '网络开小差了',
        icon: 'offline',
        duration: 3000
      })
    }
  })
}


// 搜索（关键词或者类型）
function search(url, keyword, start, count, cb){
  var that = this
  message.hide.call(that)
  var url = decodeURIComponent(url)
  if (that.data.hasMore) {
    wx.request({
      url: url,
      data: {
        keyword: keyword,
        start: start,
        count: count
      },
      method: 'GET',
      header: {
        "Content-Type": "application/json,application/json"
      },
      success: function(res){
        if(res.data.subjects.length === 0){
          that.setData({
            hasMore: false,
            showLoading: false
          })
        }else{
          that.setData({
            films: that.data.films.concat(res.data.subjects),
            start: that.data.start + res.data.subjects.length,
            showLoading: false
          })
          if (res.data.subjects.length < 3){  //解决结果小于3条时 卡在一直玩命加载的情况
            that.setData({
              hasMore: false
            })
          }
          wx.setNavigationBarTitle({
              title: keyword
          })
        }
        wx.stopPullDownRefresh()
        typeof cb == 'function' && cb(res.data)
      },
      fail: function() {
        that.setData({
            showLoading: false
        })
        message.show.call(that,{
          content: '网络开小差了',
          icon: 'offline',
          duration: 5000
        })
      }
    })
  }
}
module.exports = {
  fetchFilms: fetchFilms,
  fetchFilmDetail: fetchFilmDetail,
  search: search
}