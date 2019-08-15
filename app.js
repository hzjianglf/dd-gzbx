// const server ="http://192.168.0.184:8080/ding";
const server ="http://sso.sibetech.cn:8017/ding";
App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
  globalData: {
    corpId:'',
    server:server,
    token:'',
    name:'',
    path:''
  },
  getHeader: function () {
    var headers = {
      //"Bearer"是约定的意义
      "Authorization": "Bearer " + this.globalData.token,
      "Content-Type": "application/x-www-form-urlencoded"
    }
    return headers;
  }
});
