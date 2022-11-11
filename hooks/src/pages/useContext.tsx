import React, { useState, useContext, createContext } from 'react'

interface UseContextType {
  isVisible?: boolean
  onClose?: () => any
}
// const children
// useContext的作用
// useContext可以帮助我们跨越组件层级直接传递变量，实现数据共享。
// useContext：解决组件间传值的问题。
// redux：统一管理应用状态。
// 所以，我们可以使用useContext结合useReducer来模拟一个小型redux场景，而无法替代redux

// Context的作用就是对它所包含的组件树提供全局共享数据的一种技术

const CountContext = createContext({
  num: 1,
})
const UseContext: React.FC<UseContextType> = (props) => {
  const [count, setCount] = useState<number>(0)
  return (
    <div>
      <p>父组件点击数量：{count}</p>
      <button onClick={() => setCount(count + 1)}>{'点击+1'}</button>
      {/* 通过实例的Provider 改变当前创建的Context */}
      <CountContext.Provider value={{ num: count + 1 }}>
        <Counter />
      </CountContext.Provider>
    </div>
  )
}

const Counter = () => {
  const count = useContext(CountContext) // 可以获取值
  return <p>子组件获得的点击数量：{count.num}</p>
}

export default UseContext
