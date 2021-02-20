import React, { useState } from 'react'
import { Bar, HorizontalBar, Line, } from "react-chartjs-2";
import { useDispatch, useSelector } from 'react-redux';
// import { CoinHistoryItem } from '../../models/Coin';
import { RootState } from '../../redux/store';
// import { countDates } from "../../utils/utils";
import Loader from '../Loader';
import ChartToolBar from './ChartToolBar';
import { selectCoinHistoryDateAction, updateCoinCurrentPriceSocketAction } from '../../redux/coins/actions';
import socketIOClient from "socket.io-client";
import { socketEndPoint } from '../../api/api';

let socket: SocketIOClient.Socket = {} as SocketIOClient.Socket

function chartOptions() {
   const options = {
      responsive: true,
      legend: {
         labels: {
            fontSize: 16,
            fontColor: 'rgb(255, 255, 255)'
         }
      },
      maintainAspectRatio: false,
      scales: {
         pointLabels: {
            fontStyle: "bold",
            fontColor: 'rgb(255, 255, 255)'
         },
         yAxes: [{
            ticks: {
               beginAtZero: true,
               min: 0,
               fontStyle: "bold",
               fontColor: 'rgb(255, 255, 255)'
            },
         }],
         xAxes: [{
            ticks: {
               beginAtZero: true,
               min: 0,
               fontStyle: "bold",
               fontColor: 'rgb(255, 255, 255)'
            },
         }],
      },
   };
   return options
}

function dispalyData(label: any, color: string, data: any[], currentDateSelected: string, currentPriceUpdated?: any) {
   if (data.length) {
      return {
         labels: data.map((i) => currentDateSelected === 'all' ? i.date : i.time),
         datasets: [
            {
               label: label + '/' + data[0].date,
               data: data.map((item, i) => item.price),
               backgroundColor: color,
               fill: false,
               borderWidth: 1,
               hoverBackgroundColor: 'rgba(240, 25, 90, 0.8)',
               hoverBorderColor: 'rgba(55, 68, 245, 1)',
               // borderColor: 'rgba(55, 68, 245, 0.5)',
               borderColor: color,
               pointStyle: 'dash',
               borderStyleCap: 'butt'
            }
         ]
      }
   }
}


interface Props {
   coinName: string
   color: string
   coinSelectedId?: number
}

function Chart({ coinName, color, coinSelectedId }: Props) {
   const [chartPresentetion, setChartPresentetion] = useState('Bar')

   const currentPriceUpdated = useSelector((state: RootState) => state.updatedCurrentPrice.currentPriceUpdated)

   const {
      loading,
      currentDateSelected,
      lastPriceDaySelected,
      firstPriceDaySelected,
      changeDay,
      dateSelectedItems,
      datesCount,
      lastDate,
      changePresentDay
   } = useSelector((state: RootState) => state.coin)

   const dispatch = useDispatch()

   function handleChangePresent(event: React.ChangeEvent<HTMLSelectElement>) {
      const { value } = event.target
      setChartPresentetion(() => value)
   }

   function handleChangeDate(event: React.ChangeEvent<HTMLSelectElement>) {
      const { value } = event.target
      dispatch(selectCoinHistoryDateAction(value))
   }


   let chart

   if (chartPresentetion === 'Bar' && dateSelectedItems.length) {
      chart = <Bar
         type="bar"
         data={dispalyData(coinName, color, dateSelectedItems, currentDateSelected, currentPriceUpdated)}
         options={chartOptions()}
         height={100}
      />
   }

   else if (chartPresentetion === 'HorizontalBar' && dateSelectedItems.length) {
      chart = <HorizontalBar
         type="horizontalBar"
         data={dispalyData(coinName, color, dateSelectedItems, currentDateSelected)}
         options={chartOptions()}
         height={100}
      />
   }

   else if (chartPresentetion === 'Line' && dateSelectedItems.length) {
      chart = <Line
         type="line"
         data={dispalyData(coinName, color, dateSelectedItems, currentDateSelected)}
         options={chartOptions()}
         height={100}
      />
   }

   return (
      <React.Fragment>
         {loading ? <Loader /> :
            <React.Fragment>
               <ChartToolBar
                  handleChangeDate={handleChangeDate}
                  handleChangePresent={handleChangePresent}
                  present={chartPresentetion}
                  currentDateSelected={currentDateSelected}
                  lastPriceDaySelected={lastPriceDaySelected}
                  firstPriceDaySelected={firstPriceDaySelected}
                  changeDay={changeDay}
                  historyDatesLength={datesCount}
                  changePresent={changePresentDay}
               />
               <div style={{ height: '60vh', width: '100%' }}>
                  {chart}
               </div>
            </React.Fragment>}
      </React.Fragment>
   )
}

export default Chart