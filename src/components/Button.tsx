import React from 'react'

interface Props {
   disabled?: boolean
   handleClick: () => void
   color?: string
   active?: boolean
   content: string
}

function Button({ disabled, handleClick, color, active, content }: Props) {
   return (
      <button
         disabled={disabled && disabled}
         onClick={handleClick}
         style={{ backgroundColor: color && color, color: 'white' }}
         className={`btn  btn-sm ${active ? 'active' : ''}`}
      >
         {content}
      </button>
   )
}

export default Button
