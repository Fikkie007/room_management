import { useState, useEffect } from 'react'

function App() {
  const [message, setMessage] = useState('')
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error('API error:', err))
  }, [])

  return (
    <div className="max-w-2xl mx-auto p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Room Management</h1>
      <p className="mb-4">Backend says: {message || 'Loading...'}</p>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 cursor-pointer"
      >
        Count: {count}
      </button>
    </div>
  )
}

export default App