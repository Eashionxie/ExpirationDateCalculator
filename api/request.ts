// export const baseURL = 'http://127.0.0.1:3000'
export const baseURL = 'https://tool-api.iwebtools.site'

/**
    request.js
     * 封装一个Promise风格的通用请求
     * url - 请求地址
     * option - 包含请求方式、请求参数的配置对象
 */
const request = function (url: string, options: any) {
    return new Promise((resolve, reject) => {
        wx.showLoading({
            title: '',
            mask: true,
        })
        wx.request({
            url: baseURL + url,
            method: options.method,
            data: options.method == "GET" || options.method == "DELETE" ? options.data : JSON.stringify(options.data),
            // header这里根据业务情况自行选择需要还是不需要
            header: {
                'openid': wx.getStorageSync('openid'),
            },
            success: (res) => {
                if (res.statusCode !== 200) return reject(res.data)
                resolve(res.data)
            },
            fail: (err) => {
                reject(err)
            },
            complete: () => {
                wx.hideLoading()
            }
        })
    })
}

//封装get方法
request.get = (url: string, data?: any) => {
    return request(url, {
        method: "GET",
        data
    })
},
//封装post方法
request.post = (url: string, data: any) => {
    return request(url, {
        method: "POST",
        data
    })
}
//封装put方法
request.put = (url: string, data: any) => {
    return request(url, {
        method: "PUT",
        data
    })
}


export default request