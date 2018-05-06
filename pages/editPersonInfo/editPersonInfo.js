var config = require('../../comm/script/config')
var util = require('../../util/util')
Page({
  data:{
    name: '',
    nickName: '',
    gender: 0,
    genderArray: ['男', '女'],
    genderIndex: 0,
    age: 0,
    birthday: '',
    constellation: '',
    constellationArray: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
    constellationIndex: 0,
    company: '',
    school: '',
    tel: '',
    email:'',
    intro: '',
    birthdayEndDate: ''
  },
  onShow:function(options){
    var birthdayEndDate = util.getDate()
    var that = this
    wx.request({
      url: config.apiList.getUserInfo,
      data: {
        uname: getApp().globalData.userInfo.nickName
      },
      success: function (res) {
        var data = res.data.result
        that.setData({
          name: data.name,
          gender: data.gender,
          age: data.age,
          birthday: data.birthday,
          constellation: data.constellation,
          company: data.company,
          school: data.school,
          tel: data.tel,
          email: data.email,
          intro: data.intro,
          birthdayEndDate: birthdayEndDate
        })
      }
    })
  },
  setUserInfo: function(e) {
    var data = e.detail.value
    wx.request({
      url: config.apiList.setUserInfo,
      data: {
        uname: getApp().globalData.userInfo.nickName,
        name: data.name,
        gender: data.gender,
        age: data.age,
        birthday: data.birthday,
        constellation: data.constellation,
        company: data.company,
        school: data.school,
        tel: data.tel,
        email: data.email,
        intro: data.intro
      },
      success: function (res) {
        wx.showToast({
          title: '资料修改成功',
          icon: 'success',
          duration: 1500
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '../personInfo/personInfo'
          })
        }, 1000)
      }
    })
  },
  changeGender: function(e) {
    console.log(e)
    var genderIndex = e.detail.value
    if (genderIndex != "null") {
      this.setData({
        genderIndex: genderIndex,
        gender: this.data.genderArray[this.data.genderIndex]
      })
    }
  },
  changeBirthday: function(e) {
    var birthday = e.detail.value
    if (birthday != "null") {
      this.setData(
        {birthday: birthday}
      )
    }
  },
  changeConstellation: function(e) {
    var constellationIndex = e.detail.value
    if (constellationIndex != "null") {
      this.setData({
        constellationIndex: constellationIndex,
        constellation: this.data.constellationArray[this.data.constellationIndex]
      })
    }
  }
})