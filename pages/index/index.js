const app = getApp()
Page({
  data: {
    corpId: '',
    authCode: '',
    userId: '',
    userName: '',
    hideList: true,
    showNotice: false,
    notice: ""
  },
  loginSystem() {
    let _this = this
    dd.showLoading();
    dd.getAuthCode({
      success: (res) => {
        console.log(res.authCode)
        console.log('getAuthCode ok')
        dd.hideLoading();
        this.setData({
          authCode: res.authCode
        })
        dd.httpRequest({
          url: `${app.globalData.server}/dd/auth`,
          method: 'POST',
          data: {
            code: res.authCode,
            appId: '5'
          },
          dataType: 'json',
          success: function(res) {
            console.log(res)
            console.log('httpRequest ok')
            if (res.data.errcode == '0') {//保存token，跳转到主页
              app.globalData.name = res.data.name
              app.globalData.path = res.data.path
              dd.setStorage({
                key: 'token',
                data: {
                  token: res.data.token
                },
                success: function() {
                  dd.showToast({ content: '写入缓存成功' });
                },
                fail: function() {
                  dd.showToast({ content: '写入缓存失败' });
                }
              });
              app.globalData.token = res.data.token;
              dd.switchTab({
                url: '/pages/my/my'
              })
            } else {//停留在该页面，提示身份信息错误
              dd.showToast({
                type: 'fail',
                content: res.data.errmsg,
                duration: 3000
              });
              _this.setData({
                showNotice: true,
                notice: res.data.errmsg
              })
            }
          },
          fail: function(err) {
            dd.showToast({
              content: JSON.stringify(res)
            });
            console.log('request err')
            console.log(JSON.stringify(err))
          }
        });
      },
      fail: (err) => {
        // dd.alert({
        //   content: JSON.stringify(err)
        // })
        console.log(JSON.stringify(err))
        console.log('getAuthCode err')
        my.hideLoading();
      }
    })
  },
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    this.loginSystem()
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  muban() {
    let _this = this
    dd.showLoading();
    dd.httpRequest({
          url: `${app.globalData.server}/dd/auth`,
          method: 'POST',
          data: {
            code: res.authCode,
            appId: '5'
          },
          dataType: 'json',
          success: function(res) {
            console.log(res)
            console.log('httpRequest ok')
            if (res.data.errcode == '0') {//保存token，跳转到主页
              dd.setStorage({
                key: 'token',
                data: {
                  token: res.data.token
                },
                success: function() {
                  dd.showToast({ content: '写入缓存成功' });
                },
                fail: function() {
                  dd.showToast({ content: '写入缓存失败' });
                }
              });
              app.globalData.token = res.data.token;
              dd.switchTab({
                url: '/pages/my/my'
              })
            } else {//停留在该页面，提示身份信息错误
              dd.showToast({
                type: 'fail',
                content: res.data.errmsg,
                duration: 3000
              })
            }
          },
          fail: function(res) {
            dd.showToast({content: JSON.stringify(res)});
          }
        });
  }
});
