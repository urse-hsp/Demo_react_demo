import React, { useState, useEffect, memo, useCallback } from 'react'

interface useCallbackType {
  isVisible?: boolean
  onClose?: () => any
}

const Children = (props: any) => {
  useEffect(() => {
    console.log('更新2')
  })
  
  return (
    <>
      {/* {console.log('return更新')} */}
      Children
    </>
  )
}
const MemoChildren = memo(Children)

// useCallback的作用：配合memo用于优化子组件的渲染次数
// useCallback 对于子组件渲染优化

const useCallbackView: React.FC<useCallbackType> = (props) => {
  const [num, setNum] = useState(0)

  // const click = useCallback(() => {
  //   console.log('click')
  // }, [])
  const click = () => {}
  return (
    <>
      <div onClick={() => setNum((n) => n + 1)}>num: {num}</div>
      <MemoChildren click={click} />
    </>
  )
}
export default useCallbackView
/**
 * title: 父组件修改数据，子组件都会被重新渲染
 * 使用memo缓存子组件，子组件只需要根据props数据地址改变时触发更新（但是函数还是能触发,需要使用useCallback缓存）
 * 组件状态更新时，组件会重新更新。函数被重新创建 就导致了函数每次都是新的，子组件额外的触发了更新
 * 使用useCallback：根据依赖是否变化决定选用缓存函数，还是新函数
 */
