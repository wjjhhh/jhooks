import { useReducer } from 'react'

export default () => {
    const [,s] = useReducer(() => ({}), {})
    return s
  }