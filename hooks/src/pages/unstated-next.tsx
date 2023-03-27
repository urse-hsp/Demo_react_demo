// https://zhuanlan.zhihu.com/p/93500556
// createContainer 可以将任何 Hooks 包装成一个数据对象，这个对象有 Provider 与 useContainer 两个 API，其中 Provider 用于对某个作用域注入数据，而 useContainer 可以取到这个数据对象在当前作用域的实例。

// unstated 针对class组件开发
// unstated-next 针对函数组件开发：unstated-next 这个库只做了一件事情：提供 createContainer 将自定义 Hooks 封装为一个数据对象，提供 Provider 注入与 useContainer 获取 Store 这两个方法。
// unstated-next 本身也只是对 Hooks 的一种模式化封装，Hooks 已经能很好解决状态管理的问题，我们真的不需要 “再造” React 数据流工具了。

// unstated-next 用 40 行代码号称 React 数据管理库的终结版

// 1.
// 数据与 UI 分离，利用 Custom Hooks 就可以完成，这不需要借助任何框架

// 2.
// 数据分享给其他组件，利用 useContext 就可以完成，这不需要借助任何框架：
// 使用了 useContext 的 API，并且对 Provider 的封装没有形成固定模式，这就是 usestated-next 要解决的问题。

// React Hooks 已经非常适合做状态管理，而生态应该做的事情是尽可能利用其能力进行模式化封装。
// 我们看到这个方案可以利用 React 官方提供的能力完全覆盖 Redux 中间件的能力，对 Redux 库实现了降维打击，所以下一代数据流方案随着 Hooks 的实现是真的存在的。
import React, { useState, useEffect, createContext, useContext } from 'react'
import { createContainer } from 'unstated-next'

// **1** 普通+ -
// function CounterDisplay() {
//   let [count, setCount] = useState(0)
//   let decrement = () => setCount(count - 1)
//   let increment = () => setCount(count + 1)
//   return (
//     <div>
//       <button onClick={decrement}>-</button>
//       <p>You clicked {count} times</p>
//       <button onClick={increment}>+</button>
//     </div>
//   )
// }

// // **2** 数据与 UI 分离，利用 Custom Hooks
// function useCounter() {
//   let [count, setCount] = useState(0)
//   let decrement = () => setCount(count - 1)
//   let increment = () => setCount(count + 1)
//   return { count, decrement, increment }
// }

// function CounterDisplay() {
//   let counter = useCounter()
//   return (
//     <div>
//       <button onClick={counter.decrement}>-</button>
//       <p>You clicked {counter.count} times</p>
//       <button onClick={counter.increment}>+</button>
//     </div>
//   )
// }

// **3** 数据分享给其他组件，利用 useContext 就可以完成，这不需要借助任何框架：
// function useCounter() {
//   let [count, setCount] = useState(0)
//   let decrement = () => setCount(count - 1)
//   let increment = () => setCount(count + 1)
//   return { count, decrement, increment }
// }

// let Counter: any = createContext(null)

// function Children() {
//   let counter: any = useContext(Counter)
//   return (
//     <div>
//       <button onClick={counter.decrement}>-</button>
//       <p>You clicked {counter.count} times</p>
//       <button onClick={counter.increment}>+</button>
//     </div>
//   )
// }

// function CounterDisplay() {
//   let counter = useCounter()
//   return (
//     <Counter.Provider value={counter}>
//       <Children />
//       <Children />
//     </Counter.Provider>
//   )
// }

// **4**但这样还是显示使用了 useContext 的 API，并且对 Provider 的封装没有形成固定模式，这就是 usestated-next 要解决的问题。

// function useCounter() {
//   let [count, setCount] = useState(0)
//   let decrement = () => setCount(count - 1)
//   let increment = () => setCount(count + 1)
//   return { count, decrement, increment }
// }

// let Counter = createContainer(useCounter)

// function App() {
//   let counter = Counter.useContainer()
//   return (
//     <div>
//       <button onClick={counter.decrement}>-</button>
//       <p>You clicked {counter.count} times</p>
//       <button onClick={counter.increment}>+</button>
//     </div>
//   )
// }

// function CounterDisplay() {
//   return (
//     <Counter.Provider>
//       <App />
//       <App />
//     </Counter.Provider>
//   )
// }

// **5**对 Hooks 的参数也进行了规范化，我们可以通过 initialState 设定初始化数据，且不同作用域可以嵌套并赋予不同的初始化值：
function useCounter(initialState = 0) {
  let [count, setCount] = useState(initialState)
  let decrement = () => setCount(count - 1)
  let increment = () => setCount(count + 1)
  return { count, decrement, increment }
}

const Counter = createContainer(useCounter)

function App() {
  let counter = Counter.useContainer()
  return (
    <div>
      <button onClick={counter.decrement}>-</button>
      <span>{counter.count}</span>
      <button onClick={counter.increment}>+</button>
    </div>
  )
}

function CounterDisplay() {
  return (
    <Counter.Provider>
      <App />
      <App />
      <Counter.Provider initialState={2}>
        <App />
      </Counter.Provider>
    </Counter.Provider>
  )
}
export default CounterDisplay
