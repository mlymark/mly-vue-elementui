/**
 * api接口统一管理
 */
import { get, put, remove } from './http'

/**
 * 获取企业列表信息
 */
export const getCompanyList = p => get('/company', p)

/**
 * 通过id获取企业列表信息
 */
export const getCompanyById = p => get('/company/', p)

/**
 * 添加一个企业
 */
export const addCompany = p => put('/company/', p)

/**
 * 删除一个企业
 */
export const deleteCompanys = p => remove('/company/', p)
