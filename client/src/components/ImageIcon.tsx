import React from 'react'
// import { CSSProperties } from 'styled-components'

interface Props {
   path: string
   onClick?: () => void
   style?: any
}

function ImageIcon({ path, style, onClick }: Props) {
   return (
      <img
         style={style && style}
         onClick={() => onClick ? onClick : null}
         src={path}
         alt=""
      />
   )
}

export default ImageIcon
