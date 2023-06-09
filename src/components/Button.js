import React from 'react'

function Button({ type, children }) {
  return (
    <button
      type={type}
      className="bg-green-800 px-4 py-2 my-2 text-gray-100 rounded hover:bg-green-700">
      {children}
    </button>
  )
}

export default Button
