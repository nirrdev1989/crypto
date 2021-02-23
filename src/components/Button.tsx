import React from 'react'

interface Props {
   disabled?: boolean
   handleClick: () => void
   color?: string
   active?: boolean
   content: string
   extraClass?: string
}

function Button({ disabled, handleClick, color, active, content, extraClass }: Props) {
   return (
      <button
         disabled={disabled && disabled}
         onClick={handleClick}
         style={{ backgroundColor: color && color, color: 'white', opacity: `${active ? 1 : '0.7'}` }}
         className={`btn ${extraClass && extraClass} btn-sm`}
      >
         {content}
      </button>
   )
}

export default Button
