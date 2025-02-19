import request from './request'

export const userSignIn = (code: string): Promise<any> => {
    return request.post('/api/user/register', { code })
}

export const getUser = () => {
    return request.get('/api/user/')
}

export const modifyUserInfo = (data: { nickname?: string, avatar_url?: string }) => {
    return request.put('/api/user/', data)
}