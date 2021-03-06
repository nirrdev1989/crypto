export interface Coin {
   allTimeHigh: { price: string, timestamp: number }
   approvedSupply: boolean
   change: number
   circulatingSupply: number
   color: string
   confirmedSupply: boolean
   description: string
   firstSeen: number
   history: string[]
   iconType: string
   iconUrl: string
   id: number
   links: any[]
   listedAt: number
   marketCap: number
   name: string
   numberOfExchanges: number
   numberOfMarkets: number
   penalty: boolean
   price: string
   rank: number
   slug: string
   socials: any[]
   symbol: string
   totalSupply: number
   type: string
   uuid: string
   volume: number
   websiteUrl: string
}

export interface CoinHistoryItem {
   price: number
   timeStamp: number
   date: string
   time: string
}

export interface CoinHistory {
   [key: string]: {
      firstPrice: number
      currentPrice: number
      data: CoinHistoryItem[]
      change: number
      changePresent: number
      priceUp: boolean,
      lastCache?: number
   }
}

export interface CoinBaseInfo {
   id: number
   name: string
   symbol?: string
   color: string | null
   iconUrl?: string
}

export interface CacheHistory {
   type: string
   timer: number
}

export interface UpdateCoinPriceSocket {
   change: number
   changePresent: number
   currentPrice: number
   prevPrice: number
   priceUp: boolean
   isPriceChange: boolean
}
