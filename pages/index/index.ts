import { IAppOption, ItemData } from "@/typings"

// 获取应用实例
const app = getApp<IAppOption>()

// 在文件顶部添加接口定义

Page({
  data: {
    itemList: [] as ItemData[],
    expiredCount: 0,
    warningCount: 0,
    normalCount: 0,
  },
  onShow() {
    this.initPageData()
  },
  initPageData() {
    if (app.globalData.itemList.length) {
      const curDateTime = new Date().getTime()
      const expiredCount = app.globalData.itemList.filter((v: any) => v.expire_time - curDateTime <= 0).length
      const warningCount = app.globalData.itemList.filter((v: any) => v.expire_time - curDateTime <= 5*24*3600000).length
      const list = app.globalData.itemList.map((v: ItemData) => {
        const timestamp = v.expire_time - Date.now()
        let left_days = Math.floor(timestamp / (24*3600000))
        return {...v, left_days}
      }).sort((a, b) => a.expire_time - b.expire_time)
      this.setData({
        expiredCount,
        warningCount,
        normalCount: app.globalData.itemList.length - expiredCount - warningCount,
        itemList: list
      })
    }
  },
  navigateToCreate() {
    wx.navigateTo({
      url: '../create/create'
    })
  },
  toDetail(e: any) {
    wx.navigateTo({
      url: '../detail/detail?name='+e.currentTarget.dataset.name
    })
  }
  // 事件处理函数
  // bindViewTap() {
  //   wx.navigateTo({
  //     url: '../logs/logs',
  //   })
  // },
  // onChooseAvatar(e: any) {
  //   const { avatarUrl } = e.detail
  //   const { nickName } = this.data.userInfo
  //   this.setData({
  //     "userInfo.avatarUrl": avatarUrl,
  //     hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
  //   })
  // },
  // onInputChange(e: any) {
  //   const nickName = e.detail.value
  //   const { avatarUrl } = this.data.userInfo
  //   this.setData({
  //     "userInfo.nickName": nickName,
  //     hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
  //   })
  // },
  // getUserProfile() {
  //   // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
  //   wx.getUserProfile({
  //     desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
  //     success: (res) => {
  //       console.log(res)
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   })
  // },
})
