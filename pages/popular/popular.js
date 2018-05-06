var douban = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
var app = getApp()
Page({
	data: {
		films: [],
		hasMore: true,
		showLoading: true,
		start: 0,
		bannerList: config.bannerList
	},
	onLoad: function() {
		 var that = this
		// wx.showNavigationBarLoading()
		// app.getCity(function(){
		// 	wx.hideNavigationBarLoading()
		// 	wx.setNavigationBarTitle({
		// 		title: '正在热映 - ' + config.city
		// 	})
			douban.fetchFilms.call(that, config.apiList.popular, that.data.start)
		// })
	},
	onPullDownRefresh: function() {
		var that = this
		that.setData({
			films: [],
			hasMore: true,
			showLoading: true,
			start: 0
		})
		this.onLoad()
	},
	onReachBottom: function() {
		var that = this
		if (!that.data.showLoading) {
			douban.fetchFilms.call(that, config.apiList.popular, that.data.start)
		}
	},
	viewFilmDetail: function(e) {
		var data = e.currentTarget.dataset;
		wx.navigateTo({
			url: "../filmDetail/filmDetail?mid=" + data.mid
		})
	},	
	viewFilmByType: function(e) {
		var data = e.currentTarget.dataset
		var keyword = data.type
		wx.navigateTo({
			url: '../searchResult/searchResult?url=' + encodeURIComponent(config.apiList.search.byType) + '&keyword=' + keyword
		})
	},
	viewBannerDetail: function(e) {
		var data = e.currentTarget.dataset
		if (data.type == 'film') {
			wx.navigateTo({
				url: "../filmDetail/filmDetail?mid=" + data.mid
			})
		} else if (data.type == 'person') {
			wx.navigateTo({
				url: '../personDetail/personDetail?id=' + data.id
			})
		} else if (data.type == 'search') {
			// stype(searchType) 0:关键词, 1:类型标签
			var searchUrl = stype == 'keyword' ? config.search.byKeyword : config.search.byTag
			wx.navigateTo({
				url: '../searchResult/searchResult?url=' + encodeURIComponent(searchUrl) + '&keyword=' + keyword
			})
		}
	},
	viewSearch: function() {
		wx.navigateTo({
			url: '../search/search'
		})
	},
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