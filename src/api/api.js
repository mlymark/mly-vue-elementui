/**
 * api接口统一管理
 */
import { get, post } from './http'

/**
 * 登录请求
 * p:{name:*,password:*}
 */
export const toLogin = p => post('/auth/login', p)

export const getUser = p => get('/users', p)

export const apiAddress = p => post('api/v1/users/my_address/address_edit_before', p)
