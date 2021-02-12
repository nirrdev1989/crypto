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
   date: string
}

export interface CoinHistory {
   [key: string]: {
      array: CoinHistoryItem[]
   }
}

export interface CoinBaseInfo {
   id: number
   name: string
   symbol: string
}
