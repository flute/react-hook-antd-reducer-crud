import { createAction } from 'redux-actions'
import { modalTitle, ADD } from '../constants/modal'
import { initState, initSearchQuery } from './reducer'
import Apis from '../apis'

export const setLoading = createAction('SET_LOADING', loading => ({ loading }))

export const setModal = createAction('SET_MODAL', payload => {
  return {
    modal: {
      title: modalTitle[payload?.type ?? ADD],
      ...initState.modal,
      ...(payload ?? {}),
    }
  }
})

// 保存列表数据
export const saveDatas = createAction('SAVE_DATA', datas => ({ datas }))

// 设置表单值
export const setFormData = createAction('SET_FORM_DATA', formData => ({ formData }))

// 设置搜索参数
export const setSearchQuery = createAction('SET_SEARCH_QUERY', searchQuery => ({ searchQuery }))

/**
 * 拉取列表数据
 */
export const getList = (query = {}) => async (dispatch, getState) => {
  const state = getState()
  const { searchQuery } = state
  const params = {
    ...searchQuery,
    ...query
  }
  dispatch(setLoading(true))
  const responseData = await Apis.getDataList(params).catch(_ => {
    dispatch(setLoading(false))
  })
  if (!responseData) return
  const {
    data: {
      list = [],
      total = 0
    }
  } = responseData
  dispatch(saveDatas({ data: list || [], total }))
  dispatch(setLoading(false))
}

// 创建
export const create = (params) => async (dispatch) => {
  dispatch(setLoading(true))
  await Apis.create(params).finally(_ => dispatch(setLoading(false)))
  dispatch(getList(initSearchQuery))
  dispatch(setModal({ visible: false }))
}

// 更新
export const update = (params) => async (dispatch) => {
  dispatch(setLoading(true))
  await Apis.update(params).finally(_ => dispatch(setLoading(false)))
  dispatch(getList(initSearchQuery))
  dispatch(setModal({ visible: false }))
}

// 删除
export const remove = (params) => async (dispatch) => {
  dispatch(setLoading(true))
  await Apis.remove(params).finally(_ => dispatch(setLoading(false)))
  dispatch(getList(initSearchQuery))
} 