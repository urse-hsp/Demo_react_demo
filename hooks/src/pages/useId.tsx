import React, { useId } from 'react'

interface IndexType {
  isVisible?: boolean
  onClose?: () => any
}

const Index: React.FC<IndexType> = (props) => {
  const id = useId()

  return <div>{id}</div>
}
export default Index
