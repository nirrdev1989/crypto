import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren<any> {
   extraClass?: string
}
function Card({ children, extraClass }: Props) {
   return (
      <div className={`col-md-12 ${extraClass && extraClass}`}>
         <div className="card shadow-sm">
            {children}
         </div>
      </div>
   )
}


export default Card
