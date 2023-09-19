import http from './http'

interface IUser{
    username:string,
    password:string,
}

// 登录
export const queryLoginApi = (params:IUser) =>http.post('/login',params)