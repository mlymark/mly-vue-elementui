/**
 * api接口统一管理
 */
import { get, post, put } from './http'

/**
 * 登录请求
 * p:{name:*,password:*}
 */
export const toLogin = p => post('/auth/login', p)

export const getUser = p => get('/users', p)

export const addUser = p => put('/users/register', p)
