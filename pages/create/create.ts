import dayjs from 'dayjs'

Page({
  data: {
    todayDate: '2024-12-15',
    name: '',
    factoryDate: '',
    shelfLife: 14,
    remark: '',
    shelfLifeType: 1,
    suggestions: [3,6,9,12]
  },
  onReady() {
    const date = dayjs().format('YYYY-MM-DD')
    this.setData({
      todayDate: date
    })
  },
  nameInput(e: any) {
    this.setData({
      name: e.detail.value
    })
  },
  remarkInput(e: any) {
    this.setData({
      remark: e.detail.value
    })
  },
  shelfLifeInput(e: any) {
    this.setData({
      shelfLife: e.detail.value
    })
  },
  bindDateChange(e: any) {
    this.setData({
      factoryDate: e.detail.value
    })
  },
  changeType(e: any) {
    this.setData({
      shelfLifeType: e.currentTarget.dataset.type
    })
  },
  chooseSuggest(e: any) {
    this.setData({
      shelfLife: e.currentTarget.dataset.number,
      shelfLifeType: 2
    })
  },
  saveItem() {
    if (!this.data.name) return wx.showToast({ title: '请输入物品名称', duration: 2000, icon: 'none' })
    if (!this.data.factoryDate) return wx.showToast({ title: '请选择生产日期', duration: 2000, icon: 'none' })
    if (!this.data.shelfLife) return wx.showToast({ title: '请输入保质期', duration: 2000, icon: 'none' })
    const shelf_life_time = this.data.shelfLife * 24*3600000 * (this.data.shelfLifeType === 2 ? 30 : 1)
    const expire_time = dayjs(this.data.factoryDate).valueOf() + shelf_life_time
    const item = {
      name: this.data.name,
      factory_date: this.data.factoryDate,
      shelf_life: this.data.shelfLife * (this.data.shelfLifeType === 2 ? 30 : 1),
      remark: this.data.remark,
      expire_time
    }
    // todo 新增/修改接口

    
    const newList = [...getApp().globalData.itemList, item];
    wx.setStorageSync('itemListInfo', {
      listData: newList,
      updateTime: Date.now()
    })
    getApp().globalData.itemList = newList
    wx.navigateBack()
  }
})
