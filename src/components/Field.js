import React from 'react'

function Field({ label, children }) {
  return (
    <label className="block my-2">
      <span className="block text-sm text-gray">{label}</span>
      {children}
    </label>
  )
}

export default Field
