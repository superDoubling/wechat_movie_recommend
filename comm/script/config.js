/*
备注
city: 城市（在程序载入时获取一次）
count: 返回结果数量
baiduAK: 百度地图AK
apiList: api列表
hotKeyword: 搜索页热门关键词关键词
hotTag: 搜索页热门类型
bannerList: 首页（热映页）轮播图列表列表
skinList: “我的”页面背景列表
shakeSound: 摇一摇音效地址（带url表示远程地址）
shakeWelcomeImg: 摇一摇欢迎图片
*/
var url = 'http://192.168.1.103:8081/movie_recommend'
module.exports = {
  city: '福州',
  count: 20,
  baiduAK: 'k28S8L69VGKML5GG2X6VBOKIFdhBQ6Bi',
  apiList: {
    userLogin: url + '/movie/userLogin.do',
    popular: url + '/movie/loadPopularList.do',
    // coming: 'https://api.douban.com/v2/movie/coming_soon',
    top: url + '/movie/loadTopList.do',
    search: {
      byKeyword: url + '/movie/loadMovieListByKeyword.do',
      byType: url + '/movie/loadMovieListByType.do'
    },
    getIsOldUser: url + '/movie/getIsOldUser.do',
    getTestMovieList: url + '/movie/getTestMovieListFast.do',
    filmDetail: url + '/movie/getMovieDetailsByMid.do',
    getRecommendList: url + '/movie/getRecommendList.do',
    getIsFavorite: url + '/movie/getIsFavorite.do',
    deleteFromStore: url + '/movie/deleteFromStore.do',
    addToStore: url + '/movie/addToStore.do',
    getStoreByUname: url + '/movie/getStoreByUname.do',
    getHistoryByUname: url + '/movie/getHistoryByUname.do',
    judgeMovie: url + '/movie/judgeMovie.do',
    clearMemory: url + '/movie/clearMemory.do',
    setUserInfo: url + '/movie/setUserInfo.do',
    getUserInfo: url + '/movie/getUserInfo.do',
    addToFeedback: url + '/movie/addToFeedback.do',
    getRandomMovie: url + '/movie/getRandomMovie.do',
    // personDetail: 'https://api.douban.com/v2/movie/celebrity/',
    baiduMap: 'https://api.map.baidu.com/geocoder/v2/'
  },
  hotKeyword: ['黑豹', '小萝莉的猴神大叔', '红海行动', '比得兔', '唐人街探案2', '水形物语', '环太平洋：雷霆再起', '捉妖记2', '古墓丽影：源起之战', '战狼2', '萌犬好声音'],
  hotTag: ['动作', '喜剧', '剧情', '悬疑'],
  allTag: ['喜剧', '科幻', '恐怖', '犯罪', '动画', '传记', '纪录片', '冒险', '奇幻', '历史', '悬疑', '剧情', '短片', '爱情', '家庭', '战争', '动作'],
  bannerList: [
    { type: 'film', mid: '4920389', imgUrl: url + '/images/banner_1.webp' },
    { type: 'film', mid: '26683723', imgUrl: url + '/images/banner_2.webp' },
    { type: 'film', mid: '26861685', imgUrl: url + '/images/banner_3.webp' },
    { type: 'film', mid: '26698897', imgUrl: url + '/images/banner_4.webp' },
    { type: 'film', mid: '3445906', imgUrl: url + '/images/banner_5.webp' }
  ],
  skinList: [
    { title: '公路', imgUrl: url + '/images/user_bg_1.jpg' },
    { title: '黑夜森林', imgUrl: url + '/images/user_bg_2.jpg' },
    { title: '鱼与水', imgUrl: url + '/images/user_bg_3.jpg' },
    { title: '山之剪影', imgUrl: url + '/images/user_bg_4.jpg' },
    { title: '火山', imgUrl: url + '/images/user_bg_5.jpg' },
    { title: '科技', imgUrl: url + '/images/user_bg_6.jpg' },
    { title: '沙漠', imgUrl: url + '/images/user_bg_7.jpg' },
    { title: '叶子', imgUrl: url + '/images/user_bg_8.jpg' },
    { title: '早餐', imgUrl: url + '/images/user_bg_9.jpg' },
    { title: '英伦汽车', imgUrl: url + '/images/user_bg_10.jpg' },
    { title: '草原', imgUrl: url + '/images/user_bg_11.jpg' },
    { title: '城市', imgUrl: url + '/images/user_bg_12.jpg' }
  ],
  shakeSound: {
    startUrl: url + '/sound/shake.wav',
    start: '',
    completeUrl: url + '/sound/shakeComplete.wav',
    complete: ''
  },
  shakeWelcomeImg: 'http://img.mp.sohu.com/upload/20170621/81ee1ee6f08e43fab3d9c5870377ac57_th.png'
}