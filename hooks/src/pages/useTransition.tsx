import React, { useTransition, useState } from 'react'
import './UseTransition.css'
import { Spin } from 'antd'
// import { resolve } from 'path'

// interface IndexType {
//   isVisible?: boolean
//   onClose?: () => any
// }
// // useTransition、useDeferredValue 要实现的比较像防抖节流的功能，但是实现原理倒是不一样的。
//  // https://juejin.cn/post/7020621789172613157
// // 可以用来降低渲染优先级
// // 用来包裹计算量大的 function和 value，降低优先级，减少重复渲染次数。
// // 搜索调用
// // 使用过渡
// function UseTransition() {
//   const [count, setCount] = useState(0)
//   const [isPending, startTransition] = useTransition()

//   const change = (e: any) => {
//     startTransition(() => {
//       setCount(e.target.value)
//     })
//   }

//   return (
//     <div>
//       {isPending && <Spin />}
//       <input type='text' onChange={change} />
//       <button>{count}</button>
//     </div>
//   )
// }
// export default UseTransition

// *紧急的大量UI更新*
// 大量更新是如何影响用户体验的。
// 一个员工名字列表和一个查找员工的姓名搜索框，这个组件会高亮显示匹配搜索内容的员工姓名
// 打开示例页面并快速在输入框内键入查询字段，你可能会注意到键入延迟以及用户界面在明显的时间内没有响应
// 在用户键入时更新输入框的值是一个必须快速执行的紧急任务，更新高亮显示匹配列表是一个繁重且不紧急的任务。
// 大量的非紧急任务落后于轻量的紧急任务。
// useTransition()钩子能够帮助你区分紧急的UI更新和非紧急的UI更新。
export const fakeNames: any = []
for (let index = 1000; index < 20000; index++) {
  fakeNames.push(index)
}
function ListItem({ name, highlight }: any) {
  const index = name.toLowerCase().indexOf(highlight.toLowerCase())

  if (index === -1) {
    return <div>{name}</div>
  }
  return (
    <div>
      {name.slice(0, index)}
      <span className='highlight'>{name.slice(index, index + highlight.length)}</span>
      {name.slice(index + highlight.length)}
    </div>
  )
}
export function UseTransition() {
  const [isPending, startTransition] = useTransition()
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState('')

  const changeHandler = ({ target: { value } }: any) => {
    setQuery(value)
    startTransition(() => setHighlight(value))
  }

  return (
    <div>
      <input onChange={changeHandler} value={query} type='text' />
      <div>
        {isPending ? (
          <Spin />
        ) : (
          fakeNames.map((item: any, i: any) => (
            <ListItem key={i} name={`${item}`} highlight={highlight} />
          ))
        )}
      </div>
    </div>
  )
}

export default UseTransition
// 打开这个使用了transitionos特性的示例，如果你非常快速地在输入框中键入，你会注意到高亮列表的延迟更新。
// React将紧急任务(当用户键入时更新输入框)的更新和非紧急任务(高亮显示过滤内容)的渲染区分开了，这样的操作提升了用户体验。



/**
 * 总结：
 * 允许将UI更新标记为高优先级的或者可中断的低优先级操作。
 * 默认情况下，我们认为React中的所有更新都是紧急的(也就是所有更新的优先级相同)。那会导致一个问题-快速更新会被大量更新拖慢速度。
 *  问题：大量更新影响用户体验，如输入框搜索，大量数据。键值和列表选中在明显的时间内没有响应。，键值和列表选中都反映的很慢
 * 任务权重，输入框其实是必须快速执行的紧急任务，更新列表选中是频繁且不紧急的任务
 * 通过useTransition 配置额外变量给子组件使用，区分出任务，优化了输入框键值反应速度（解决了输入框必须是快速执行的紧急任务）
 * 
 */