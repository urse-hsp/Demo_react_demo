import React, { useState, useEffect, memo } from 'react'

interface ReactMemoType {
  isVisible?: boolean
  onClose?: () => any
}

const Children = ({ data = [], msg = '1' }: any) => {
  useEffect(() => {
    // console.log('useEffect')
  }, [])
  return (
    <div>
      {console.log('渲染' + msg)}
      {data.length &&
        data?.map((item: any) => {
          return <div key={item}>{item}</div>
        })}
    </div>
  )
}
const MemoChildren = memo(Children)
/**
 * 组件渲染的是最常有的事情。但是，有部分的渲染是不必要的，是可以避免的。
 * 在react的一般规则中，只有父组件的某一个状态改变，父组件下面所有的子组件不论是否使用了该状态，都会进行重新渲染。
 * 对于没有用到被改变的那个状态的组件来说，重新渲染是完全没有必要的。所以，React.memo就诞生了。
 * memo: 组件缓存，缓存整个组件
 */

/**
 *
 * memo的坑:
 * 1 被memo的保护的组件即使props变了，它也不会重新渲染。 (被改变的那个props是一个数组（对象）的时候)
 * 因为memo的保护是对props做一个浅比较(只对比储存在栈内存中的地址)，push看似改变了 但变的只是栈中的数据，存在与栈中的地址依然不会改变
 * 深拷贝和浅拷贝的区别：https://blog.csdn.net/qq_48637854/article/details/124982976?spm=1001.2014.3001.5501
 * memo针对props做地址浅比较 判断有数据有没有改变
 */
const ReactMemo: React.FC<ReactMemoType> = (props) => {
  const [name, setName] = useState('ReactMemo')
  const [list, setList] = useState<any>([1, 2, 3, 4, 5])

  return (
    <>
      <span
        onClick={() => {
          // setName(name + 1)
          const newList = list
          setList(newList.push(6)) //这样是不会被memo检测到的，是无法触发memo更新的
          // setList([...list, list.length + 1]) //这样才可以，创建一个新数组，再在里面解构旧数组，往后面追加 1
          //这样,就等于返回了一个新的数组，栈中的地址就会改变，memo就可以检测到并触发更新
        }}>
        {name}
      </span>
      <Children />
      {/* 包裹了memo缓存，组件不会被刷新，只根据props改变刷新 */}
      <MemoChildren msg='2' data={list} />
    </>
  )
}
export default ReactMemo
