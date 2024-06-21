import { useState } from 'react'
import './App.css'
import Split from './components/split'
import Panel from './components/split/panel'
function App() {
  const [sizes, chnangeSize ] = useState([50, 50])
  return (
    <>
      <Split style={{width:"500px", height: "200px"}} sizes={sizes} onSizeChange={chnangeSize}>
        <Panel >
          <div style={{backgroundColor:"rgb(213, 215, 217)", width: "100%"}}></div>
        </Panel>
        <Panel >
          <div style={{backgroundColor:"rgb(161, 165, 169)", width: "100%"}}></div>
        </Panel>
      </Split>
    </>
  )
}

export default App
