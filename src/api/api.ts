export const allCoinsUrl: string = 'http://localhost:3007/all-coins'
export const singleCoin: string = 'http://localhost:3007/coin/'
export const singleCoinHistory: string = 'http://localhost:3007/coin-history/'

export function fectData(url: string, callData: Function) {
   fetch(url)
      .then((result) => result.json())
      .then((result) => callData(result, null))
      .catch((error) => {
         console.log(error)
         callData(error.message, null)
      })
}
