import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren<any> {
   extraClass?: string
}
function Card({ children, extraClass }: Props) {
   return (
      <div className={`${extraClass && extraClass}`}>
         <div className="card border-0 shadow-sm">
            {children}
         </div>
      </div>
   )
}




export default Card
