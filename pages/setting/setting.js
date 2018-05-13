var config = require('../../comm/script/config')
var app = getApp()
Page({
  data:{
    cells: [
      [{title: '个人资料', text: '', access: true, fn: 'viewPersonInfo'}],
      [
        {title: '手机信息', text: '', access: true, fn: 'viewSystemInfo'},
        {title: '清除缓存', text: '', access: false, fn: 'clearStorage'}
      ],
      [{title: '更新位置', text: '', access: true, fn: 'viewLocation'}],
      [{title: '关于', text: '', access: true, fn: 'viewAbount'}]
    ]
  },
  onLoad:function(options){},
  viewPersonInfo: function(){
    wx.navigateTo({
			url: "../personInfo/personInfo"
		})
  },
  viewSystemInfo: function(){
    wx.navigateTo({
			url: "../systemInfo/systemInfo"
		})
  },
  viewLocation: function(){
    wx.navigateTo({
			url: "../location/location"
		})
  },
  clearStorage: function() {
    wx.showModal({
      title: '确认要清除',
      content: '将删除收藏和浏览记录，并重置兴趣类型和评分',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: config.apiList.clearMemory,
            data: {
              uname: getApp().globalData.userInfo.nickName
            },
            success: function(){
              wx.showToast({
                title: '清除成功',
                icon: 'success',
                duration: 1000
              })
            }
          }) 
        }
      }
    })
  },
  viewAbount: function() {
    wx.navigateTo({
			url: "../about/about"
		})
  }
})