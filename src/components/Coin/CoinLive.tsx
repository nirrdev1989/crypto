import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import socketIOClient from "socket.io-client";
import { socketEndPoint } from '../../api/api';
import { updateCoinCurrentPriceSocketAction } from '../../redux/coins/actions';
import ChartsPrices, { PriceItem } from '../Chart/ChartsPrices';
// import { PriceItem } from '../Chart/ChartToolBar';

let socket: SocketIOClient.Socket = {} as SocketIOClient.Socket

function CoinLive() {
   const dispatch = useDispatch()
   const currentProceUpdate = useSelector((state: RootState) => state.updatedCurrentPrice)
   const { coin: { id, name }, currentPrice } = useSelector((state: RootState) => state.coin)

   React.useEffect(() => {
      socket = socketIOClient(socketEndPoint)
      socket.emit('coinLastHistory', { id: id, name: name }, (result: any) => {
         console.log(result)
         dispatch(updateCoinCurrentPriceSocketAction(result))
      })

      return () => {
         // console.log('DISCONNECT SOCKET')
         socket.emit('disconnetc')
         socket.disconnect()
      }
   }, [currentProceUpdate])

   let posColor = currentProceUpdate.priceUp ? 'rgb(43, 251, 164)' : 'rgb(251, 43, 43)'

   return (
      <div>
         <div className={`${currentProceUpdate.isPriceChange ? 'animate-center' : ''} live-prcies `}>
            <PriceItem text="from" price={currentProceUpdate.prevPrice} symbol="$" />
            <PriceItem text="to" price={currentProceUpdate.currentPrice || currentPrice} symbol="$" />/
            <PriceItem text="Change" price={currentProceUpdate.change} symbol="$" style={{ color: posColor }} />/
            <PriceItem text="Present" price={currentProceUpdate.changePresent} symbol="%" style={{ color: posColor }} />
         </div>
      </div>
   )
}

export default CoinLive
