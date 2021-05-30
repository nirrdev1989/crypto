import React, { PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
interface Props extends PropsWithChildren<any> {
   extraClass?: string
   header: string
}
function Modal({ children, header }: Props) {
   const show = useSelector((state: RootState) => state.modal.open)
   return (
      <div className={`modal ${show ? 'open' : 'close'}`}>
         <h3>{header}</h3>
         <hr />
         {children}
      </div>

   )
}

export default Modal
