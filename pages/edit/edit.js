
const app = getApp();
Page({
  data: {
    state: "",
    inputFocus: true,
    bank: '',
    name: '',//报修人员
    place: '',//报修地点
    remak: "",
    lxfs: "",
    id: '',
    serverUrl: '',
    filePath: '',
    /*form */
    wxry: "",
    wxryid: "",
    wxryList: [],
    wxrydh: "",
    gj: "",
    clnr: "",
    bxclList: [],

  },
  onLoad(query) {
    // 页面加载
    console.log(query)
    this.setData({ id: query.id })
  },
  onReady() {
    // 页面加载完成
    this.getData()
  },
  getData() {
    let _this = this
    dd.httpRequest({
      url: `${app.globalData.server}/gzwx_ding/myManage/${_this.data.id}`,
      method: 'POST',
      headers: app.getHeader(),
      data: {},
      dataType: 'json',
      success: function(res) {
        console.log(res.data)
        console.log(res.data.errcode)
        if (res.data.errcode == '0') {
          _this.setData({
            id: res.data.bx.id,
            state: res.data.bx.dqjd,
            name: res.data.bx.bxr,
            bank: res.data.bx.lxmc,
            place: res.data.bx.dd,
            lxfs: res.data.bx.lxfs,
            remark: res.data.bx.ms,
            serverUrl: res.data.bx.serverUrl,
            wxryid: res.data.bx.wxryid,
            bxclList: res.data.bx.bxclList,
            wxrydh: res.data.bx.wxrydh,
            gj: res.data.bx.gj,
            clnr: res.data.bx.clnr
          })
        } else {
          dd.showToast({
            type: 'fail',
            content: res.data.errmsg,
            duration: 3000
          });
        }
      },
      fail: function(res) {
        dd.showToast({
          content: JSON.stringify(err)
        });
      }
    });
  },
  save(e) {
    let _this = this

    dd.showLoading({
      content: '提交中...'
    });
    dd.httpRequest({
      url: `${app.globalData.server}/gzwx_ding/editBx`,
      method: 'POST',
      headers: app.getHeader(),
      data: {
        dqjd: e.target.dataset.st,
        id: _this.data.id,
        wxryid: _this.data.wxryid,
        wxrydh: _this.data.wxrydh,
        gj: _this.data.gj,
        clnr: _this.data.clnr
      },
      dataType: 'json',
      success: function(res) {
        dd.hideLoading()
        if (res.data.errcode == '0') {
          dd.showToast({
            type: 'success',
            content: res.data.errmsg,
            duration: 3000
          });
        } else {
          dd.showToast({
            type: 'fail',
            content: res.data.errmsg,
            duration: 3000
          });
        }
      },
      fail: function(res) {
        dd.hideLoading()
        dd.showToast({
          content: JSON.stringify(err)
        });
      }
    });
  },
  onAutoFocus() {
    this.setData({
      inputFocus: true,
    });
  },
  onItemInput(e) {
    this.setData({
      [e.target.dataset.field]: e.detail.value,
    });
  },
  onItemFocus() {
    this.setData({
      inputFocus: false,
    });
  },
  onItemBlur() { },
  onItemConfirm() { },
  onClear(e) {
    this.setData({
      [e.target.dataset.field]: '',
    });
  },
  onPickerTap() {
    my.showActionSheet({
      title: '选择报修类型',
      items: banks,
      success: (res) => {
        this.setData({
          bank: banks[res.index],
        });
      },
    });
  },
  chooseImage() {
    dd.chooseImage({
      sourceType: ['camera', 'album'],
      count: 2,
      success: (res) => {
        dd.alert({
          content: JSON.stringify(res),
        });
        if (res && res.filePaths) {
          this.setData({
            filePaths: res.filePaths,
          });
        }
      },
      fail: () => {
        dd.showToast({
          content: 'fail', // 文字内容
        });
      }
    })
  },
  previewImage() {
    dd.previewImage({
      current: 2,
      urls: [
        'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
        'https://img.alicdn.com/tps/TB1pfG4IFXXXXc6XXXXXXXXXXXX.jpg',
        'https://img.alicdn.com/tps/TB1h9xxIFXXXXbKXXXXXXXXXXXX.jpg'
      ].concat(this.data.filePaths),
    });
  },
  saveImage() {
    dd.saveImage({
      url: 'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
      showActionSheet: true,
      success: (res) => {
        dd.alert({
          title: `保存成功:${JSON.stringify(res)}`,
        });
      },
      fail: (err) => {
        dd.alert({
          content: `保存图片失败：${JSON.stringify(err)}`,
        });
      }
    });
  }
});
