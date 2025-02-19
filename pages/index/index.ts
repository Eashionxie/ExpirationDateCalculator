import { IAppOption, ItemData } from "@/typings"

// 获取应用实例
const app = getApp<IAppOption>()

// 在文件顶部添加接口定义

Page({
  data: {
    showLoginDialog: false,
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
      const curDateTime = Date.now()
      const expiredCount = app.globalData.itemList.filter((v: any) => v.expire_time - curDateTime <= 0).length
      const warningCount = app.globalData.itemList.filter((v: any) => v.expire_time - curDateTime > 0 && v.expire_time - curDateTime <= 5*24*3600000).length
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
    // if (!wx.getStorageSync('openid')) {
    //   this.setData({
    //       showLoginDialog: true
    //   })
    //   return
    // }
    wx.navigateTo({
      url: '../create/create'
    })
  },
  toDetail(e: any) {
    wx.navigateTo({
      url: '../detail/detail?name='+e.currentTarget.dataset.name
    })
  },

  onCloseLogin() {
    this.setData({
        showLoginDialog: false
    })
},

async onSuccessLogin() {
    this.setData({
        showLoginDialog: false
    })
},
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
