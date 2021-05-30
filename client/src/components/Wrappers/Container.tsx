import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren<any> {
   extraClass?: string
}

function Container({ children, extraClass }: Props) {
   return (
      <div className={`container ${extraClass && extraClass}`}>
         {children}
      </div>
   )
}

export default Container
