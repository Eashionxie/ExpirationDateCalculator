import { ItemData } from "@/typings"
import dayjs from "dayjs"

Page({
    data: {
        itemInfo: {} as ItemData,
        todayDate: '2024-12-15',
        shelfLifeType: 1,
        editIndex: 0
    },
    onLoad(option) {
      const date = dayjs().format('YYYY-MM-DD')
        const info: ItemData = getApp().globalData.itemList.find((v: ItemData) => v.name === option.name)
        this.setData({
            itemInfo: info,
            todayDate: date,
            shelfLifeType: info.shelf_life % 30 === 0 ? 2 : 1
        })
    },
    nameInput(e: any) {},
    shelfLifeInput(e: any) { },
    bindDateChange(e: any) {},
    changeType(e: any) {},
    remarkInput(e: any) {},
    deleteItem() {
      wx.showModal({
        title: '提示',
        content: `确认删除 ${this.data.itemInfo.name} 吗？`,
        success: (res) => {
          if (res.confirm) {
            // todo 删除接口
            
            const newList = getApp().globalData.itemList.filter((v: ItemData) => v.name !== this.data.itemInfo.name)
            wx.setStorageSync('itemListInfo', {
              listData: newList,
              updateTime: Date.now()
            })
            getApp().globalData.itemList = newList
            wx.navigateBack()
          }
        }
      })      
    }
})