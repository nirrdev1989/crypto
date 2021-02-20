import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import socketIOClient from "socket.io-client";
import { socketEndPoint } from '../../api/api';
import { updateCoinCurrentPriceSocketAction } from '../../redux/coins/actions';

let socket: SocketIOClient.Socket = {} as SocketIOClient.Socket

function CoinLive() {
   const dispatch = useDispatch()
   const currentProceUpdate = useSelector((state: RootState) => state.updatedCurrentPrice)
   const { currentCoinId, currentPrice } = useSelector((state: RootState) => state.coin)

   React.useEffect(() => {
      socket = socketIOClient(socketEndPoint)
      socket.emit('coinLastHistory', currentCoinId, (result: any) => {
         dispatch(updateCoinCurrentPriceSocketAction(result.currentLastPriceUpdated, result.change))
      })

      return () => {
         // console.log('DISCONNECT SOCKET')
         socket.emit('disconnetc')
         socket.disconnect()
      }
   }, [currentProceUpdate])

   return (
      <div>
         <div className={`${currentProceUpdate.isPriceChange ? 'animate-center' : ''} live-prcies `}>
            <span>${currentProceUpdate.currentPriceUpdated || currentPrice}</span>/&nbsp;
            <span
               style={{ color: currentProceUpdate.priceUp ? 'rgb(43, 251, 164)' : 'rgb(251, 43, 43)' }}>
               ${currentProceUpdate.change}
            </span>/&nbsp;
            <span style={{ color: currentProceUpdate.priceUp ? 'rgb(43, 251, 164)' : 'rgb(251, 43, 43)' }}>
               %{currentProceUpdate.presentChange}
            </span>&nbsp;
         </div>
      </div>
   )
}

export default CoinLive
