const mode = process.env.NODE_ENV

console.log(mode)
export const allCoinsUrl: string = mode === 'development' ? 'http://localhost:3007/all-coins' : '/all-coins'
export const singleCoin: string = mode === 'development' ? 'http://localhost:3007/coin/' : 'coin/'
export const singleCoinHistory: string = mode === 'development' ? 'http://localhost:3007/coin-history/' : 'coin-history/'
export const socketEndPoint: string = mode === 'development' ? 'http://127.0.0.1:3007' : 'https://mycryptoprice.herokuapp.com'
export const coinHistoryRange: string = mode === 'development' ? 'http://localhost:3007/coins/coin-range' : 'coins/coin-range'
export const coinHistoryRangeChange: string = mode === 'development' ? 'http://localhost:3007/coins/coin-range-change' : 'coins/coin-range-change'
export function fectData(url: string, callData: Function) {
   fetch(url)
      .then((result) => result.json())
      .then((result) => callData(result, null))
      .catch((error) => {
         callData(error.message, null)
      })
}
