import React, { useDeferredValue, useEffect, useState } from 'react'
import { useDebounce } from 'ahooks'
 // useDeferredValue 拖迟到紧急更新之后，如果是紧急更新先返回之前的值，在完成后在渲染值


// interface UseDeferredValueType {
//   isVisible?: boolean
//   onClose?: () => any
// }

// const MySlowList = (props: any) => {
//   const { text } = props
//   return <div>{text}</div>
// }

// const UseDeferredValue: React.FC<UseDeferredValueType> = (props) => {
//   const [text, setText] = useState('hello')
//   const deferredText = useDeferredValue(text)

//   function handleChange(e: any) {
//     setText(e.target.value)
//   }

//   return (
//     <div className='App'>
//       <label>
//         Type into the input: <input value={text} onChange={handleChange} />
//       </label>
//       ...
//       <MySlowList text={deferredText} />
//     </div>
//   )
// }

const List = (props: any) => {
  const [list, setList] = useState<any>([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount((count) => count + 1)
    setTimeout(() => {
      setList([
        { name: props.text, value: Math.random() },
        { name: props.text, value: Math.random() },
        { name: props.text, value: Math.random() },
        { name: props.text, value: Math.random() },
        { name: props.text, value: Math.random() },
        { name: props.text, value: Math.random() },
        { name: props.text, value: Math.random() },
      ])
    }, 500)
  }, [props.text])
  return (
    <>
      <p>{'我被触发了' + count + '次'}</p>,
      <ul>
        {list.map((item: any) => (
          <li>
            Hello:{item.name} value:{item.value}
          </li>
        ))}
      </ul>
      ,
    </>
  )
}

function UseDeferredValue() {
  const [text, setText] = useState('喵爸')
  const deferredText = useDeferredValue(text)
  const debouncedValue = useDebounce(text)
  const handleChange = (e: any) => {
    setText(e.target.value)
  }
  return (
    <div className='App'>
      <input value={text} onChange={handleChange} />
      <List text={text} />
      <List text={deferredText} />
      <List text={debouncedValue} />
    </div>
  )
}
export default UseDeferredValue

// 列表优化
//  useDeferredValue 拖迟到紧急更新之后，如果是紧急更新先返回之前的值，在完成后在渲染值