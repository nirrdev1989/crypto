import React, { useState } from 'react'
import { Bar, HorizontalBar } from "react-chartjs-2";
import { useDispatch, useSelector } from 'react-redux';
// import { CoinHistoryItem } from '../../models/Coin';
import { RootState } from '../../redux/store';
// import { countDates } from "../../utils/utils";
import Loader from '../Loader';
import ChartToolBar from './ChartToolBar';
import { selectCoinHistoryAction } from '../../redux/coins/actions';



function chartOptions() {
   const options = {
      scales: {
         yAxes: [{
            ticks: {
               beginAtZero: true,
               min: 0,
            },
         }],
         xAxes: [{
            ticks: {
               beginAtZero: true,
               min: 0,
            },
         }],
      },
   };
   return options
}

function dispalyData(label: string, color: string, data: any[]) {
   if (data.length) {
      return {
         labels: data.map((i) => i.date),
         datasets: [
            {
               label: label,
               data: data.map((i) => i.price),
               backgroundColor: data.map(() => color),
               fill: true,
               borderWidth: 1,
               hoverBackgroundColor: 'rgba(240, 25, 90, 0.8)',
               hoverBorderColor: 'rgba(55, 68, 245, 1)',
               borderColor: 'rgba(55, 68, 245, 0.5)',
            }
         ]
      }
   }
}


interface Props {
   coinName: string
   color: string
}

function Chart({ coinName, color }: Props) {
   const [present, setPresent] = useState('Bar')

   const {
      loading,
      currentDateSelected,
      lastPriceDaySelected,
      firstPriceDaySelected,
      changeDay,
      dateSelectedItems,
      datesCount
   } = useSelector((state: RootState) => state.coin)

   const dispatch = useDispatch()

   function handleChangePresent(event: React.ChangeEvent<HTMLSelectElement>) {
      const { value } = event.target
      setPresent(() => value)
   }

   function handleChangeDate(event: React.ChangeEvent<HTMLSelectElement>) {
      const { value } = event.target
      dispatch(selectCoinHistoryAction(value))
   }

   let chart

   if (present === 'Bar') {
      chart = <Bar
         type="bar"
         data={dispalyData(coinName, color, dateSelectedItems)}
         options={chartOptions()}
         height={110}
      />
   }

   else if (present === 'HorizontalBar') {
      chart = <HorizontalBar
         type="horizontalBar"
         data={dispalyData(coinName, color, dateSelectedItems)}
         options={chartOptions()}
         height={150}
      />
   }

   return (
      <React.Fragment>
         {loading ? <Loader /> :
            <React.Fragment>
               <ChartToolBar
                  handleChangeDate={handleChangeDate}
                  handleChangePresent={handleChangePresent}
                  present={present}
                  currentDateSelected={currentDateSelected}
                  lastPriceDaySelected={lastPriceDaySelected}
                  firstPriceDaySelected={firstPriceDaySelected}
                  changeDay={changeDay}
                  historyDatesLength={datesCount}
               />
               {chart}
            </React.Fragment>}
      </React.Fragment>
   )
}

export default Chart