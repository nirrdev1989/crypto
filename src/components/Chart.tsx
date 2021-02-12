import React, { useState } from 'react'
import { Bar, HorizontalBar } from "react-chartjs-2";
import { useSelector } from 'react-redux';
import { CoinHistoryItem } from '../models/Coin';
import { RootState } from '../redux/store';
import { countDates } from "../utils/dates";
import Loader from './Loader';

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
               // backgroundColor: coin.history.map(() => coin.color),
               borderWidth: 1,
               hoverBackgroundColor: 'rgba(240, 25, 90, 0.8)',
               hoverBorderColor: 'rgba(55, 68, 245, 1)',
               borderColor: 'rgba(55, 68, 245, 0.5)',
            }
         ]
      }
   }
}

const presentetion: string[] = ['Bar', 'HorizontalBar']

interface Props {
   coinHistory: CoinHistoryItem[]
   coinName: string
   color: string
   handleChangeDate: (value: any) => void
   historyDatesLength: number
}

function Chart({ coinHistory, coinName, color, handleChangeDate, historyDatesLength }: Props) {
   const [present, setPresent] = useState('Bar')
   const { loading, currentDateSelected } = useSelector((state: RootState) => state.coin)

   function handleChangePresent(event: React.ChangeEvent<HTMLSelectElement>) {
      const { value } = event.target
      setPresent(() => value)
   }

   let chart


   if (present === 'Bar') {
      chart = <Bar
         data={dispalyData(coinName, color, coinHistory)}
         options={options}
         height={100}
      />
   }

   else if (present === 'HorizontalBar') {
      chart = <HorizontalBar
         data={dispalyData(coinName, color, coinHistory)}
         options={options}
         height={100}
      />
   }

   return (
      <React.Fragment>
         {loading ? <Loader /> :
            <>
               <select className="form-select-sm" onChange={handleChangeDate} defaultValue={currentDateSelected}>
                  {countDates(historyDatesLength).map((date) => {
                     return <option key={date} value={date}>{date}</option>
                  })}
                  <option value="all">All</option>
               </select>
               &nbsp;
               <select className="form-select-sm" onChange={handleChangePresent}>
                  {presentetion.map((p) => {
                     return <option key={p} value={p}>{p}</option>
                  })}
               </select>
               {chart}
            </>}
      </React.Fragment>
   )
}

export default Chart