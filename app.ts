import { IAppOption } from "./typings"

// app.ts
App<IAppOption>({
  globalData: {
    updateTime: 0,
    itemList: []
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取本地数据
    const localItemsData = wx.getStorageSync('itemListInfo')
    if (localItemsData && localItemsData.listData && localItemsData.listData.length) {
      this.globalData.itemList = localItemsData.listData
      this.globalData.updateTime = localItemsData.updateTime
    }

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})