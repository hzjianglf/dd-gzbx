const app = getApp()
Page({
  data: {
    inputFocus: true,
    banks: [],//选项
    bank: '',
    lxid: '',
    name: '',//报修人员
    place: '',//报修地点
    remark: "",//内容
    filePaths: [],//本地目录
    path_submit: [],//提交表单的path
  },
  onLoad(query) {
    // 页面加载
    this.getList();
    this.setData({
      name: app.globalData.name
    })
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  getList() {//选项列表
    let _this = this;
    let res = dd.getStorageSync({ key: 'lxList' });
    console.log(res.data.lxList)
    let lxList = res.data.lxList
    let arr = [];
    if (lxList) {
      for (let i = 0; i < lxList.length; i++) {
        arr.push(lxList[i].name)
      }
      console.log(arr)
      this.setData({
        banks: arr
      })
    }
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
    let _this = this;
    console.log(_this.data.banks)
    dd.showActionSheet({
      title: '选择报修类型',
      items: _this.data.banks,
      cancelButtonText: "取消",
      success: (res) => {
        this.setData({
          bank: _this.data.banks[res.index],
        });
      },
    });
  },
  chooseImage() {
    let _this = this
    dd.chooseImage({
      sourceType: ['camera', 'album'],
      count: 5,
      success: (res) => {
        console.log(res)
        let path = []
        if (res && res.filePaths) {
          for (let i = 0; i < res.filePaths.length; i++) {
            dd.uploadFile({
              url: `${app.globalData.server}/resource/uploadFile`,
              fileType: 'image',
              fileName: 'file',
              filePath: res.filePaths[i],//临时目
              success: (res) => {
                path.push(res.data)
              },
              fail: (res) => {
                dd.showToast({
                  content: JSON.stringify(err)
                });
              }
            });
          }
          _this.setData({
            path_submit: path
          })
          this.setData({
            filePaths: res.filePaths,
          });
        }
      },
      fail: () => {
        dd.showToast({ content: '图片选择' });
      }
    })
  },
  resetForm() {
    this.setData({
      bank:'',
      place: '',
      remark: '',
      filePaths: '',
      lxfs:'',
    })
  },
  submit() {
    let _this = this
    let res = dd.getStorageSync({ key: 'lxList' });
    console.log(res.data.lxList)
    let lxList = res.data.lxList
    if (lxList) {
      for (let i = 0; i < lxList.length; i++) {
        if (this.data.bank == lxList[i].name) {
          this.setData({
            lxid: lxList[i].id
          })
          break
        }
      }
    }
    console.log(
      {
        lxid: _this.data.lxid,
        name: _this.data.name,
        lxmc: _this.data.bank,
        dd: _this.data.place,
        ms: _this.data.remark,
        lxfs: _this.data.lxfs,
        files: JSON.stringify(_this.data.path_submit)
      }
    )

    if (!_this.data.lxid || !_this.data.bank) {
      dd.showToast({
        content: '请选择报修类型！',
        duration: 3000
      });
      return;
    }
    if (!_this.data.place) {
      dd.showToast({
        content: '请选填写报修地点！',
        duration: 3000
      });
      return;
    }
    if (!_this.data.lxfs) {
      dd.showToast({
        content: '请填写联系方式！',
        duration: 3000
      });
      return;
    }
    if (!_this.data.remark) {
      dd.showToast({
        content: '请填写报修内容！',
        duration: 3000
      });
      return;
    }
    if (_this.data.path_submit.length == 0) {
      dd.showToast({
        content: '请上传图片！',
        duration: 3000
      });
      return;
    }
    dd.showLoading({
      content: '提交中...'
    });
    dd.httpRequest({
      url: `${app.globalData.server}/gzwx_ding/add`,
      method: 'POST',
      headers: app.getHeader(),
      data: {
        lxid: _this.data.lxid,
        name: _this.data.name,
        lxmc: _this.data.bank,
        dd: _this.data.place,
        ms: _this.data.remark,
        lxfs: _this.data.lxfs,
        files: JSON.stringify(_this.data.path_submit)
      },
      dataType: 'json',
      success: function(res) {
        dd.hideLoading()
        console.log(res)
        if (res.data.errcode == '0') {
          dd.showToast({
            type: 'success',
            content: res.data.errmsg,
            duration: 3000
          });
          _this.resetForm()
          setTimeout(()=>{
             dd.switchTab({
                url: '/pages/my/my'
              })
          },3000)
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
