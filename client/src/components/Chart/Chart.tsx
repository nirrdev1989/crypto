import React, { useState } from 'react'
import { Bar, HorizontalBar, Line, } from "react-chartjs-2";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Loader from '../Loader';
import ChartToolBar from './ChartToolBar';
import { fetchCoinHistoryChangeAction } from '../../redux/coins/actions';
import { ranges } from "../../localdata/local.data";


function chartOptions(themeColor: string) {
   return {
      responsive: true,
      legend: {
         labels: {
            fontSize: 16,
            // fontColor: 'rgb(255, 255, 255)',
            fontColor: themeColor
         }
      },
      maintainAspectRatio: false,
      scales: {
         pointLabels: {
            fontStyle: "bold",
            fontColor: themeColor

         },
         yAxes: [{
            ticks: {
               // beginAtZero: true,
               // min: 0,
               fontStyle: "bold",
               fontColor: themeColor

            },
         }],
         xAxes: [{
            ticks: {
               // beginAtZero: true,
               // min: 0,
               fontStyle: "bold",
               // fontColor: 'rgb(255, 255, 255)'
               fontColor: themeColor

            },
         }],
      },
   };
}

function dispalyData(label: any, color: string, data: any[], currentRangeSelected: string, currentPriceUpdated?: any) {
   return function () {
      if (data.length) {
         return {
            labels: data.map((i) => {
               if (
                  currentRangeSelected === '3day' ||
                  currentRangeSelected === 'week' ||
                  currentRangeSelected === '2week' ||
                  currentRangeSelected === 'mount' ||
                  currentRangeSelected === '3mount' ||
                  currentRangeSelected === '6mount' ||
                  currentRangeSelected === 'year'
               ) {
                  return i.date
               } else if (currentRangeSelected === 'all') {
                  return i.date.split('/')[2]
               }
               return i.time
            }),
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
}


interface Props {
   coinName: string
   color: string
   coinSelectedId?: number
   // customRange: boolean
}

function Chart({ coinName, color }: Props) {
   const [chartPresentetion, setChartPresentetion] = useState('Bar')

   const dispatch = useDispatch()

   const { loading } = useSelector((state: RootState) => state.coin)
   const coinHistory = useSelector((state: RootState) => state.coinHistory)
   const { isDark } = useSelector((state: RootState) => state.theme)

   function handleChangeChartPresent(event: React.ChangeEvent<HTMLSelectElement>) {
      const { value } = event.target
      setChartPresentetion(() => value)
   }

   function handleChangeRange(event: React.ChangeEvent<HTMLSelectElement>) {
      const { value } = event.target
      dispatch(fetchCoinHistoryChangeAction(coinName, ranges[value], coinHistory.coinHistory))
   }

   let chart

   if (!coinHistory.loadingHistory) {
      const chartData = dispalyData(coinName, color, coinHistory.historyItems, coinHistory.currentRangeSelected)
      const themeColor = !isDark ? 'black' : 'rgb(255, 255, 255)'
      if (chartPresentetion === 'Bar' && coinHistory.historyItems.length) {
         chart = <Bar
            type="bar"
            data={chartData()}
            options={chartOptions(themeColor)}
            height={60}
         />
      }

      else if (chartPresentetion === 'HorizontalBar' && coinHistory.historyItems.length) {
         chart = <HorizontalBar
            type="horizontalBar"
            data={chartData()}
            options={chartOptions(themeColor)}
            height={60}
         />
      }

      else if (chartPresentetion === 'Line' && coinHistory.historyItems.length) {
         chart = <Line
            type="line"
            data={chartData()}
            options={chartOptions(themeColor)}
            height={60}
         />
      }
   }

   return (
      <React.Fragment>
         {loading || coinHistory.loadingHistory ? <Loader /> :
            <React.Fragment>
               <ChartToolBar
                  handleChangeRange={handleChangeRange}
                  handleChangeChartPresent={handleChangeChartPresent}
                  present={chartPresentetion}
                  currentRangeSelected={coinHistory.currentRangeSelected}
                  change={coinHistory.change}
                  changePresent={coinHistory.changePresent}
                  currentPrice={coinHistory.priceEndOfRange}
                  firstPrice={coinHistory.priceStartOfRange}
                  priceUp={coinHistory.priceUp}
                  coinName={coinName}
               />
               <div style={{ height: '50vh', width: '100%' }}>
                  {chart}
               </div>
            </React.Fragment>}
      </React.Fragment>
   )
}

export default Chart