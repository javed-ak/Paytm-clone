import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='text-6xl font-bold'><span className='text-blue-900'>Pay</span><span className='text-sky-400'>tm</span></div>
    </div>
    </>
  )
}

export default App
