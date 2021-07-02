import React from 'react'
import reducer, { initState, initPageSize } from './reducer'

const Context = React.createContext(null);

export {
  Context,
  initState,
  initPageSize,
}

export default reducer