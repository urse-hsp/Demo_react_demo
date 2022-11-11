import React, { useState, useMemo, useCallback } from 'react'

interface useMemoType {
  isVisible?: boolean
  onClose?: () => any
}


// const Child = (props: any) => {
//   let getRichChild = () => {
//     console.log('rich child')
//     return 'rich child'
//   }

//   let richChild = useMemo(() => {
//     //执行相应的函数
//     return getRichChild()
//   }, [props.name])

//   return (
//     <div>
//       isChild: {props.isChild ? 'true' : 'false'}
//       <br />
//       {richChild}
//     </div>
//   )
// }
// const useMemoView: React.FC<useMemoType> = (props) => {
//   let [isChild, setChild] = useState(false)
//   return (
//     <div>
//       <Child isChild={isChild} name='1' />
//       <button onClick={() => setChild(!isChild)}>改变Child</button>
//     </div>
//   )
// }

//Com组件
const useMemoView = () => {
  const [params1, setParams1] = useState(0)
  const [params2, setParams2] = useState(0)

  //这种是需要我们手动去调用的函数
  const handleFun1 = () => {
    console.log('我需要手动调用，你不点击我不执行')
    setParams1((val) => val + 1)
  }

  //这种被称为计算属性，不需要手动调用，在渲染阶段就会执行的。
  // state改变时，组件重新渲染会计算会重新执行
  // 如果函数里面的计算过程非常的复杂，那么每次重新计算无疑的非常麻烦的
  const computedFun1 = () => {
    console.log('我又执行计算了1')
    return params2
  }

  // 让组件在改变与计算属性无关的状态的时候进行的渲染不触发我们计算属性的重新计算
  // 第一个值填写我们需要缓存的计算属性，第二个值填写依赖，useMemo会在每次需要重新计算的时候去比较依赖是否被更改，只有当依赖改变了被useMemo保护的函数才会重新执行，否则拒绝重新执行，直接返回旧的计算属性值。
  const computedFun2 = useMemo(() => {
    console.log('我又执行计算了2')
    return params2
  }, [params2])

  const computedFun3 = useCallback(() => {
    return params2
  }, [params2])

  return (
    <div>
      {/* <div onClick={handleFun1}>
        每次重新渲染的时候我就会执行 computed:{computedFun1()}
      </div> */}
      <div onClick={handleFun1}>
        每次重新渲染的时候我就会执行2 computed:{computedFun3()}
      </div>
    </div>
  )
}
export default useMemoView


// useCallback缓存的是方法的引用
// useMemo 用来缓存计算属性的。对于当前组件高开销的计算优化
// useMemo 缓存的结果是回调函数中return回来的值，主要用于缓存计算结果的值，应用场景如需要计算的状态
//

/** 计算属性
 * 有些函数，需要我们手动的去点击，去完成一些动作才触发。而有些函数，则是直接在渲染的时候就执行，在DOM区域被当作属性值一样去使用。
 * 而计算属性，最后一定会使用return返回一个值！(返回值可以是值，也可以是组件)
 */


// 使用情况：
// 第一种情况 当我们的某一个计算属性真的需要大量的计算时候
// 第二种情况 当子组件依赖父组件的某一个依赖计算属性并且子组件使用了React.memo进行优化了的时候。

// 缓存并不是免费的，所有被useMemo保护的函数都会被加入useMemo的工作队列。
// 在组件进行渲染并且此组件内使用了useMemo之后，为了校验改组件内被useMemo保护的这个计算属性是否需要重新计算，它会先去useMemo的工作队列中找到这个函数，然后还需要去校验这个函数都依赖是否被更改。



// 两者的区别
/**
 * useMemo  缓存的结果是回调函数中return回来的值，主要用于缓存计算结果的值，应用场景如需要计算的状态
 * useCallback  缓存的结果是函数，主要用于缓存函数，应用场景如需要缓存的函数，因为函数式组件每次任何一个state发生变化，会触发整个组件更新，一些函数是没有必要更新的，此时就应该缓存起来，提高性能，减少对资源的浪费；另外还需要注意的是，useCallback应该和React.memo配套使用，缺了一个都可能导致性能不升反而下降。
 */
