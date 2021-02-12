import React from 'react'
import ReactHtmlParser from 'react-html-parser';
import { Coin } from '../../models/Coin';

interface Props {
   coin: Coin
}
function CoinDescription({ coin }: Props) {
   if (Object.keys(coin).length > 0) {
      return (
         <React.Fragment>
            <h4>{coin?.name}/ {coin?.symbol}</h4>
            <hr />
            {ReactHtmlParser(coin?.description || '')}
            <hr />
            <h3>Links</h3>
            {coin?.links.map((link, i) => {
               return (
                  <p key={link.name + i}>
                     {link.type}: &nbsp;
                     <a href={link.url} target="_blank">
                        {link.name}
                     </a>
                  </p>
               )
            })}
         </React.Fragment>
      )
   }

   return null
}

export default CoinDescription
