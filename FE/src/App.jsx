import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Routing from './routes/Routing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <Routing/>
      </div>
    
    </>
  )
}

export default App
