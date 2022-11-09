import React, { useReducer } from 'react'

interface UseReducerType {
  isVisible?: boolean
  onClose?: () => any
  initialCount?: any
}

function init(initialCount: any) {
  return { count: initialCount }
}
// const initialState = { count: 0 }

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'reset':
      return init(action.payload)
    default:
      throw new Error()
  }
}

const UseReducer: React.FC<UseReducerType> = (props) => {
  const { initialCount = 1 } = props
  // 第一个参数：reducer。
  // 第二个参数：初始化的state。如果没有第三个参数，则state默认是传入的值，返回值为最新的state和dispatch函数（用来触发reducer函数，计算对应的state）。
  // 第三个参数：如果有这个参数，则对初始值state做一个更新（可以没有）

  const [state, dispatch] = useReducer(reducer, initialCount, init)

  return (
    <div>
      UseReducer Count: {state.count}
      <button onClick={() => dispatch({ type: 'reset', payload: initialCount })}>
        Reset
      </button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  )
}
export default UseReducer
