import React, { useState, useEffect, useLayoutEffect } from 'react'

interface UseLayoutEffectType {
  isVisible?: boolean
  onClose?: () => any
}

const UseLayoutEffect: React.FC<UseLayoutEffectType> = (props) => {
  // 页面渲染后执行
  useEffect(() => {
    console.log('useEffect')
  }, [])

  // 页面渲染前执行
  useLayoutEffect(() => {
    console.log('useLayoutEffect')
  }, [])
  return <div>1</div>
}
export default UseLayoutEffect
