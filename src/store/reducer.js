import { handleActions } from 'redux-actions'
import { setModal, saveDatas, create, setFormData, setSearchQuery, setLoading } from './actions'
import { ADD, modalTitle } from '../constants/modal'

const initFormValues = _ => ({
  name: '',
  age: '',
  address: ''
})

export const initSearchFormValues = {
  name: '',
  age: ''
}

export const initPageSize = {
  page: 0,
  pageSize: 10
}

export const initSearchQuery = {
  ...initSearchFormValues,
  ...initPageSize,
}

export const initState = {
  loading: false,
  modal: {
    visible: false,
    type: ADD,
    title: modalTitle[ADD]
  },
  datas: {
    data: [],
    total: 0,
  },
  formData: initFormValues(),
  searchQuery: initSearchQuery
}

const handleSetLoading = (state, { payload }) => {
  return { ...state, loading: payload.loading }
}

const handleSetModal = (state, { meta, payload }) => {
  const newState =  { ...state, modal: Object.assign({}, state.modal, payload.modal) }
  // 弹窗关闭时，自动初始化表单的值
  if (!newState.modal.visible) newState.formData = initFormValues()
  return newState
}

const handleSaveDatas = (state, { payload }) => {
  return { ...state, datas: payload.datas }
}

const handleSetFormData = (state, { payload }) => {
  return { ...state, formData: payload.formData }
}

const handleSetSearchQuery = (state, { payload }) => {
  return { ...state, searchQuery: { ...state.searchQuery, ...payload.searchQuery } }
}

const reducer = handleActions(
  new Map([
    [setLoading, handleSetLoading],
    [setModal, handleSetModal],
    [saveDatas, handleSaveDatas],
    [setFormData, handleSetFormData],
    [setSearchQuery, handleSetSearchQuery],
  ]),
  initState
)

export default reducer