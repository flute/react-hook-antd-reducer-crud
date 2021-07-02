import React, { useEffect } from 'react'
import reducer, { initState, Context } from './store'
import { getList } from './store/actions'
import Action from './components/action'
import Create from './components/create'
import Table from './components/table'
import './index.less'
import useEnhancedReducer from './hook/useEnhancedReducer'

const Template = () => {
  const [state, dispatch, getState] = useEnhancedReducer(reducer, initState)

  useEffect(() => {
    dispatch(getList())
  }, [])

  return <div className='curd-template'>
    <Context.Provider value={{ state, dispatch, getState }}>
      <Action />
      <Create />
      <Table />
    </Context.Provider>
  </div>
}

export default Template