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
 * 备注：每次在调 getList 之前都会先调用 setSearchQuery 保存搜索参数，所以第一版时考虑：dispatch 是同步执行，所以调用 getlist 时，搜索参数已经保存成功。
 * 因此调用 getList 不需要传搜索参数，直接在 getList 内使用 getState 获取最新的搜索参数即可。最终测试发现bug: setSearchQuery 和 getList 两个dispatch
 * 并未顺序执行，原因是使用原生的 useReducer 触发的 dispatch 的确是严格的同步顺序执行，而经过升级包装后的 useEnhancedReducer ，只有面对普通类型的 action
 * 会顺序执行，对于 Function 类型的 action，以及 payload 为promise类型的 action，不能保证同步顺序执行。最终采用在调用 getList 时，同步传递搜索参数的方法。
 */
export const getList = (query = {}) => async (dispatch, getState) => {
  const state = getState()
  const { searchQuery } = state
  const params = {
    ...searchQuery,
    ...query
  }
  console.log('getList', params)
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

// 拉取列表数据
// export const getList = createAction('GET_LIST', (searchQuery = initSearchQuery) => Apis.getDataList(searchQuery))

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