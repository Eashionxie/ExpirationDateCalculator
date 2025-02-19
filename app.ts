import { IAppOption } from "./typings"

// app.ts
App<IAppOption>({
  globalData: {
    updateTime: 0,
    itemList: []
  },
  onLaunch() {
    // todo 获取服务端数据
    
    // 获取本地数据
    const localItemsData = wx.getStorageSync('itemListInfo')
    if (localItemsData && localItemsData.listData && localItemsData.listData.length) {
      this.globalData.itemList = localItemsData.listData
      this.globalData.updateTime = localItemsData.updateTime
    }
  },
})