/// <reference path="./types/index.d.ts" />
export interface ItemData {
  name: string;
  factory_date: string,
  shelf_life: number,
  expire_time: number;
}

interface IAppOption {
  globalData: {
    updateTime: number,
    itemList: [],
    userInfo?: WechatMiniprogram.UserInfo,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}