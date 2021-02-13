import React from 'react'
// import { CSSProperties } from 'styled-components'

interface Props {
   path: string
   onClick: () => void
   style: any
}

function ImageIcon({ path, style, onClick }: Props) {
   return (
      <img
         style={style}
         onClick={onClick}
         src={path}
         alt=""
      />
   )
}

export default ImageIcon
