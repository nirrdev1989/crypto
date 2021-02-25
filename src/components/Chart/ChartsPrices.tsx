import React from 'react'

interface PropsPrice {
   price: number
   style?: any
   text: string
   symbol?: string
}

export function PriceItem({ text, price, style, symbol }: PropsPrice) {
   return (
      <div className="chart-price-item" style={style ? style : null}>
         <span>{symbol}{price.toFixed(3)}</span>
         <small>{text}</small>
      </div>
   )
}

interface Props {
   change: number
   changePresent: number
   currentPrice: number
   firstPrice: number
   posColor: string
}

function ChartsPrices({ change, changePresent, currentPrice, firstPrice, posColor }: Props) {
   return (
      <div className="chart-prices">
         <PriceItem price={currentPrice} text="Last in range" symbol="$" />  /
         <PriceItem price={firstPrice} text="First in range" symbol="$" />  /
         <PriceItem price={change} style={{ color: posColor }} text="Change" symbol="$" />/
         <PriceItem price={changePresent} style={{ color: posColor }} text="Present" symbol="%" />
      </div>
   )
}

export default ChartsPrices
