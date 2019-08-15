const app = getApp()
Page({
  data: {
    tabs: [
      { title: '未取消' },
      { title: '已取消' }
    ],
    activeTab: 0,
    list: [],
    qxlist: [],//取消列表
  },
  onLoad() {
  },
  onShow(){
    this.getData()
  },
  getData() {
    let _this = this
    dd.httpRequest({
      url: `${app.globalData.server}/gzwx_ding/home`,
      method: 'POST',
      headers: app.getHeader(),
      data: {},
      dataType: 'json',
      success: function(res) {
        console.log(res)
        if (res.data.errcode == '0') {
          _this.setData({
            list: res.data.list,
            qxlist: res.data.qxlist
          })
          dd.setStorage({
            key: 'lxList',
            data: { lxList: res.data.lxList }
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
        dd.showToast({
          content: JSON.stringify(err)
        });
      }
    });
  },
  onItemClick(ev) {
    console.log(ev)
    console.log(`/pages/my/mydetail/mydetail?${ev.target.dataset.id}`)
    my.navigateTo({
      url: `/pages/my/mydetail/mydetail?id=${ev.target.dataset.id}`
    });
  },
  handleTabClick({ index }) {
    console.log(index)
    this.setData({
      activeTab: index,
    });
  },
  handleTabChange({ index }) {
    this.setData({
      activeTab: index,
    });
  }
});
