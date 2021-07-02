/**
 * 通用接口
 */
import { message } from 'antd'
import srcConfig from 'src/config'
import { getMessageDecorator, serviceHocs, getRequestsByRoot } from 'axios-service'
import { mockGetDataList, mockCreate, mockUpdate, mockRemove } from './mock'

const root = srcConfig.APIS.root

const { getErrorMsg } = serviceHocs
const { get, post } = getRequestsByRoot({ root })

// 消息装饰器
const showNoSuccess = text => _ => _
const showSuccess = text => message.success(text)
const showError = text => message.error(text)
const messageDecorator = getMessageDecorator({
  success: showSuccess,
  error: showError,
});
const onlyErrorMessageDecorator = getMessageDecorator({
  success: showNoSuccess,
  error: showError,
});

// 只展示失败消息
const errorMessageDecorator = onlyErrorMessageDecorator({
  errorMsg: getErrorMsg('接口响应异常，请联系管理员'),
});

// 展示成功和失败消息 定制成功消息提示
const successMessageDecorator = (msg = '成功') => {
  return messageDecorator({
    successMsg: msg,
    errorMsg: getErrorMsg('接口响应异常，请联系管理员'),
  })
}

class Apis {
  /**
   * 拉取数据
   */
  @mockGetDataList
  @errorMessageDecorator
  getDataList = get('api_web/v1/cloud/list/get')

  /**
   * 添加数据
   */
  @mockCreate
  @successMessageDecorator('添加成功')
  create = post('api_web/v1/cloud/create')

  /**
   * 修改数据
   */
  @mockUpdate
  @successMessageDecorator('修改成功')
  update = post('api_web/v1/cloud/update')

  /**
   * 删除数据
   */
  @mockRemove
  @successMessageDecorator('删除成功')
  remove = post('api_web/v1/cloud/del')
}

export default new Apis()
