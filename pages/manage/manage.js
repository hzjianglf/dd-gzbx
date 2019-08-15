const app = getApp()
Page({
  data: {
    tabs: [
      { title: '待处理' },
      { title: '维修中' },
      { title: '已完成' }
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
      url: `${app.globalData.server}/gzwx_ding/myManageList`,
      method: 'POST',
      headers: app.getHeader(),
      data: {},
      dataType: 'json',
      success: function(res) {
        console.log(res)
        if (res.data.errcode == '0') {
          _this.setData({
            list: res.data.bxList
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
    console.log(`/pages/edit/edit?${ev.target.dataset.id}`)
    my.navigateTo({
      url: `/pages/edit/edit?id=${ev.target.dataset.id}`
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
