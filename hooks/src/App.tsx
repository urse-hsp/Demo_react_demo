import React from 'react'
import { Tabs } from 'antd'
import UseLayoutEffect from './pages/useLayoutEffect'
import UseReducer from './pages/useReducer'

import './App.css'

function App() {
  return (
    <div className='App'>
      <Tabs defaultActiveKey='useReducer'>
        <Tabs.TabPane tab='useLayoutEffect' key='useLayoutEffect'>
          <UseLayoutEffect />
        </Tabs.TabPane>
        <Tabs.TabPane tab='useReducer' key='useReducer'>
          <UseReducer />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Tab 3' key='3'>
          Content of Tab Pane 3
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default App
