import { userSignIn } from "@/api/user"

Page({
    close() {
        this.triggerEvent('closeLogin')
    },

    handleWxLogin() {
        wx.showLoading({
            title: '登录中...'
        })
        // 先获取用户信息
        wx.getUserProfile({
            desc: '用于完善会员资料',
            success: (res) => this.successHandler(res, 1),
            fail: (err) => this.errHandler(err, 1)
        })
    },

    async successHandler (res: any, type: number) {
        if (type === 1) {
            // 获取用户信息成功后，进行登录
            wx.login({
                success: (res) => this.successHandler(res, 2),
                fail: (err) => this.errHandler(err, 2)
            })
        } else {
            if (res.code) {
                let {data, error_msg} = await userSignIn(res.code)
                if (error_msg) return wx.showToast({ title: error_msg, icon: 'error' })
                wx.setStorageSync('openid', data.openid)
                getApp().globalData.userInfo = data
    
                wx.hideLoading()
                wx.showToast({ title: '登录成功' })
                this.triggerEvent('successLogin')
            } else {
                this.errHandler(null, 3)
            }
        }
    },

    errHandler (err: any, step: number) {
        wx.hideLoading()
        wx.showToast({
            title: step === 1 ? '获取信息失败' : '登录失败',
            icon: 'none'
        })
        console.error('失败信息:', err)
    },
})