var config = require('../../comm/script/config')
Page({
  data:{
    latitude: '',
    longitude: '',
    markers: [{
      latitude: 0,
      longitude: 0,
      name: '我的位置',  
      desc: ''
    }],
    covers: [{
      latitude: 0,
      longitude: 0,
      iconPath: '../../dist/images/green_tri.png',
    }, {
      latitude: 0,
      longitude: 0,
      iconPath: '../../dist/images/green_tri.png',
      rotate: 180
    }],
    formatted_address: '',
    loading: false
  },
  onLoad:function(options){
    this.getLocation();
  },
  getLocation: function() {
    var that = this
    that.setData({
      loading: true
    })
    wx.getLocation({
      type: 'gcj02',
      success: function(res){
        // 设置地图
        that.setData({
          latitude: res.latitude,
          longitude: parseFloat(res.longitude+ '1'),
          markers: [{
            latitude: res.latitude,
            longitude: parseFloat(res.longitude+ '1')
          }],
          covers: [{
            latitude: res.latitude,
            longitude: parseFloat(res.longitude+ '1')
          }, {
            latitude: res.latitude,
            longitude: parseFloat(res.longitude+ '1')
          }]
        })
        // 获取中文详细地址
        var locationParam = res.latitude + ',' + res.longitude + '1'
        wx.request({
          url: config.apiList.baiduMap,
          data: {
            ak: config.baiduAK,
            location: locationParam,
            output: 'json',
            pois: '1'
          },
          method: 'GET',
          success: function(res){
            that.setData({
              markers: [{
                latitude: 0,
                longitude: 0,
                name: '我的位置',  
                desc: res.data.result.formatted_address
              }],
              formatted_address: res.data.result.formatted_address
            })
            that.setData({
              loading: false
            })
          },
          fail: function(){
            that.getLocation()
          }
        })
      }
    })
  },
  refreshLocation: function(){
    this.getLocation()
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: '位置分享',
      path: '/pages/location/location',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        console.log('fail');
        // 转发失败
      }
    }
  },
})