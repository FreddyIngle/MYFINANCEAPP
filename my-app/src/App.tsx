import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-700 text-white">
      <h1 className="text-4xl font-bold drop-shadow-lg">
        🚀 Tailwind is working!
      </h1>
    </div>
        
    </>
  )
}

export default App
