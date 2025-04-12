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
    <div data-theme="synthwave">
      <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold text-primary">💸 Finance Tracker</h1>

        <button className="btn btn-primary">Add Transaction</button>
        <button className="btn btn-secondary">View Reports</button>
      </div>
    </div>
        
    </>
  )
}

export default App
