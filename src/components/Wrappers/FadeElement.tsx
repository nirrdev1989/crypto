import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren<any> {
}

export default function FadeContainer({ children }: Props) {
   return (
      <React.Fragment>
         <div className="animate-center">
            {children}
         </div>
      </React.Fragment>
   )
}



