import React, { useState, useEffect, useLayoutEffect } from 'react'

interface UseLayoutEffectType {
  isVisible?: boolean
  onClose?: () => any
}

const UseLayoutEffect: React.FC<UseLayoutEffectType> = (props) => {
  // useEffect 是异步执行的
  // useEffect 的执行时机是浏览器完成渲染之后
  // 页面更新后执行 插入DOM树中 / useEffect是在渲染函数执行完成，并绘制到屏幕之后，再异步执行。

  useEffect(() => {
    console.log('useEffect')
  }, [])

  // useLayoutEffect是同步执行的
  // useLayoutEffect 的执行时机是浏览器把内容真正渲染到界面之前，和 componentDidMount 等价
  // 页面 插入DOM树中 渲染前执行
  // 使用场景：当你看见的时候
  // 
  useLayoutEffect(() => {
    console.log('useLayoutEffect')
  }, [])
  
  return <div>1</div>
}
export default UseLayoutEffect


// useEffect 是渲染完之后异步执行的，所以会导致 hello world 先被渲染到了屏幕上，再变成 world hello，就会出现闪烁现象。而 useLayoutEffect 是渲染之前同步执行的，所以会等它执行完再渲染上去，就避免了闪烁现象。也就是说我们最好把操作 dom 的相关操作放到 useLayouteEffect 中去，避免导致闪烁。

// 总结
// 优先使用 useEffect，因为它是异步执行的，不会阻塞渲染
// 会影响到渲染的操作尽量放到 useLayoutEffect中去，避免出现闪烁问题
// useLayoutEffect和componentDidMount是等价的，会同步调用，阻塞渲染
// 在服务端渲染的时候使用会有一个 warning，因为它可能导致首屏实际内容和服务端渲染出来的内容不一致。


// https://juejin.cn/post/6844904177521426439