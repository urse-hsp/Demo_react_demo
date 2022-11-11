import React, { useState, useEffect, useLayoutEffect } from 'react'

interface UseLayoutEffectType {
  isVisible?: boolean
  onClose?: () => any
}

const UseLayoutEffect: React.FC<UseLayoutEffectType> = (props) => {
  // 页面更新后执行 插入DOM树中
  useEffect(() => {
    console.log('useEffect')
  }, [])

  // 页面 插入DOM树中 渲染前执行
  useLayoutEffect(() => {
    console.log('useLayoutEffect')
  }, [])
  return <div>1</div>
}
export default UseLayoutEffect
