import { Tabs } from 'antd'
import UseLayoutEffect from './pages/useLayoutEffect'
import UseReducer from './pages/useReducer'
import UseTransition from './pages/useTransition'
import UseDeferredValue from './pages/useDeferredValue'
import UseId from './pages/useId'
import ReactMemo from './pages/React.memo'
import UseCallback from './pages/useCallback'
// import UseMemo from './pages/useMemo'
// import UseContext from './pages/useContext'

import './App.css'

function App() {
  return (
    <div className='App'>
      <Tabs defaultActiveKey='UseCallback'>
        <Tabs.TabPane tab='useLayoutEffect' key='useLayoutEffect'>
          <UseLayoutEffect />
        </Tabs.TabPane>
        <Tabs.TabPane tab='useReducer' key='useReducer'>
          <UseReducer />
        </Tabs.TabPane>
        <Tabs.TabPane tab='useTransition' key='useTransition'>
          <UseTransition />
        </Tabs.TabPane>
        <Tabs.TabPane tab='useDeferredValue' key='useDeferredValue'>
          <UseDeferredValue />
        </Tabs.TabPane>
        <Tabs.TabPane tab='UseId' key='UseId'>
          <UseId />
        </Tabs.TabPane>
        <Tabs.TabPane tab='ReactMemo' key='ReactMemo'>
          <ReactMemo />
        </Tabs.TabPane>

        <Tabs.TabPane tab='UseCallback' key='UseCallback'>
          <UseCallback />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default App
