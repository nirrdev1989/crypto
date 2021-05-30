import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren<any> { }

export default function FadeContainer({ children }: Props) {
   return (
      <div className="animate-center">
         {children}
      </div>
   )
}



