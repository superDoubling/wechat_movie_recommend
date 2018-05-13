var douban = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
Page({
  data: {
    films: [],
    hasMore: true,
    showLoading: false,
    start: 0,
    isOld: 0,
    allTag: config.allTag,
    toggleData: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    chooseData: [],
    count: 0,
    btnDisabled: false,
    btnFlag: false,
    pageNum: 1,
    movieList: [],
    resultList: [],
    likeList: [],
    unknownList: [],
    dislikeList: [],
    showLoading:false
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: config.apiList.getIsOldUser,
      data: {
        uname: getApp().globalData.userInfo.nickName,
      },
      success: function (res) {
        that.setData({
          isOld: res.data.isOld,
          showLoading: true
        });
        if (that.data.isOld == 2) {
          wx.request({
            url: config.apiList.recommendToIsOld,
            data: {
              uname: getApp().globalData.userInfo.nickName
            },
            success: function (res) {
              that.setData({
                films: res.data.subjects,
                showLoading: false,
                hasMore: false
              });
            }
          })
        } else {
          for (var i = 0; i < config.allTag.length; i++) {
            that.data.toggleData[i] = false; //添加toggle 属性 
          }
          console.log(that.data.toggleData);
        }
      }
    })
    

  },
  // onPullDownRefresh: function () {
  //   if (that.data.isOld) {
  //     var that = this
  //     that.setData({
  //       films: [],
  //       hasMore: true,
  //       showLoading: true,
  //       start: 0
  //     })
  //     douban.fetchFilms.call(that, config.apiList.coming, that.data.start)
  //   }

  // },
  // onReachBottom: function () {
  //   var that = this
  //   if (!that.data.showLoading) {
  //     douban.fetchFilms.call(that, config.apiList.coming, that.data.start)
  //   }
  // },
  viewFilmDetail: function (e) {
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: "../filmDetail/filmDetail?mid=" + data.mid
    })
  },
  viewFilmByTag: function (e) {
    var data = e.currentTarget.dataset
    var keyword = data.tag
    wx.navigateTo({
      url: '../searchResult/searchResult?url=' + encodeURIComponent(config.apiList.search.byTag) + '&keyword=' + keyword
    })
  },
  btnConfirm: function () {
    var that = this;
    if(that.data.count < 2){
      wx.showToast({
        title: '至少选2种类型喔~',
        duration: 1000,
        icon: 'none'
      })
    }else{
      that.data.pageNum++;
      that.setData({
        pageNum: that.data.pageNum
      });
      that.setData({
        showLoading: true
      });
      wx.request({
        url: config.apiList.getTestMovieList,
        data: {
          chooseData: that.data.chooseData,
          uname: getApp().globalData.userInfo.nickName
        },
        success: function (res) {
          for (var i = 0; i < res.data.subjects.length; i++) {
            that.data.resultList[i] = -2; //1喜欢 0不清楚 -1不喜欢 -2未指定 
          }
          console.log(that.data.resultList);
          that.setData({
            movieList: res.data.subjects,
            isOld: res.data.isOld,
            resultList: that.data.resultList,
            showLoading: false
          });
        }
      })
    }
    
  },
  chooseByType: function (event) {
    var that = this;
    var data = that.data;
    if (data.count >= 5 && data.toggleData[event.target.dataset.id] == false) {
      wx.showToast({
        title: '最多5种类型喔~',
        duration: 1000,
        icon: 'none'
      })
    } else {
      var thatcount = 0;
      var dataset = event.target.dataset;
      var chooseData = that.data.chooseData;
      if (data.toggleData[dataset.id]) {
        var index = chooseData.indexOf(dataset.keyword);
        if (index > -1) {
          chooseData.splice(index, 1);
        }
      } else {
        data.chooseData.push(dataset.keyword);
      }
      data.toggleData[dataset.id] = !data.toggleData[dataset.id];

      for (var i = 0; i < data.toggleData.length; i++) {
        if (data.toggleData[i] == true) {
          thatcount++;
        }
      }
      data.count = thatcount;
      if (thatcount >= 2) {
        data.btnDisabled = true;
      } else {
        data.btnDisabled = false;
      }
      that.setData({
        toggleData: data.toggleData,
        count: thatcount,
        btnDisabled: data.btnDisabled
      });

    }
  },

  changeColor: function (cb) {
    var that = this;
    var dataset = cb.currentTarget.dataset;
    var likeList = that.data.likeList;
    var unknownList = that.data.unknownList;
    var dislikeList = that.data.dislikeList;
    var resultList = that.data.resultList;
    var btnFlag = that.data.btnFlag;
    var flag = true;
    //先从喜欢、不清楚、不喜欢列表中剔除
    for (var i = 0; i < likeList.length; i++) {
      if (likeList[i] == dataset.mid) {
        likeList.splice(i, 1);
      }
    }
    for (var i = 0; i < unknownList.length; i++) {
      if (unknownList[i] == dataset.mid) {
        unknownList.splice(i, 1);
      }
    }
    for (var i = 0; i < dislikeList.length; i++) {
      if (dislikeList[i] == dataset.mid) {
        dislikeList.splice(i, 1);
      }
    }
    //加入喜欢等列表并设resultList值控制样式
    if (dataset.type == 'weixiao') {
      resultList[dataset.id] = 1
      for (var i = 0; i < resultList.length; i++) {
        if (resultList[i] == -2) {
          flag = false;
          break;
        }
      }
      that.setData({
        btnFlag: flag,
        resultList: resultList
      });
      likeList.push(dataset.mid);
    } else if (dataset.type == 'dai') {
      resultList[dataset.id] = 0;
      for (var i = 0; i < resultList.length; i++) {
        if (resultList[i] == -2) {
          flag = false;
          break;
        }
      }
      that.setData({
        btnFlag: flag,
        resultList: resultList
      });
      unknownList.push(dataset.mid);
    } else {
      resultList[dataset.id] = -1;
      for (var i = 0; i < resultList.length; i++) {
        if (resultList[i] == -2) {
          flag = false;
          break;
        }
      }
      that.setData({
        btnFlag: flag,
        resultList: resultList
      });
      dislikeList.push(dataset.mid);
    }
  },

  btnConfirm2: function () {
    var that = this;
    if(that.data.btnFlag){
      that.setData({
        showLoading: true,
        isOld: 2
      });
      wx.request({
        url: config.apiList.getRecommendList,
        data: {
          likeList: that.data.likeList,
          unknownList: that.data.unknownList,
          dislikeList: that.data.dislikeList,
          uname: getApp().globalData.userInfo.nickName
        },
        success: function (res) {
          that.setData({
            films: res.data.subjects,
            isOld: res.data.isOld,
            showLoading: false,
            hasMore: false
          });
        }
      })
    } else {
      wx.showToast({
        title: '请先评价完电影喔~',
        duration: 1000,
        icon: 'none'
      })
    }    
  },

  viewFilmByType: function (e) {
    var data = e.currentTarget.dataset
    var keyword = data.type
    wx.navigateTo({
      url: '../searchResult/searchResult?url=' + encodeURIComponent(config.apiList.search.byType) + '&keyword=' + keyword
    })
  },
})