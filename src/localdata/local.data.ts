import { CoinBaseInfo } from "../models/Coin";

export interface Range {
   from: number
   to: number
   type: string
}

export interface RangeData {
   [key: string]: Range
}

let now = new Date().getTime()
let hour = 1000 * 60 * 60
let day = hour * 24
let mount = day * 30
let lastDateActive = 1392577232 * 1000

export const ranges: RangeData = {
   '1h': {
      type: '1h',
      from: now - hour,
      to: now
   },
   '24h': {
      type: '24h',
      from: now - day,
      to: now
   },
   'week': {
      type: 'week',
      from: now - (day * 7),
      to: now
   },
   'mount': {
      type: 'mount',
      from: now - mount,
      to: now
   },
   'year': {
      type: 'year',
      from: now - (day * 365),
      to: now
   },
   'all': {
      type: 'all',
      from: lastDateActive,
      to: now
   }
}

export interface Tabs {
   value: any
   content: string
}

export const chartPresentetion: string[] = ['Bar', 'HorizontalBar', 'Line']

export const tabsArray: Tabs[] = [{
   value: 'prices',
   content: 'Prices'
}, {
   value: 'description',
   content: 'Description'
}, {
   value: 'live',
   content: 'Live'
}]



export const coninsBaseInfo: CoinBaseInfo[] = [{
   id: 1,
   symbol: "BTC",
   name: "Bitcoin",
   color: "#f7931A",
   iconUrl: "https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg"
}, {
   id: 2,
   symbol: "ETH",
   name: "Ethereum",
   color: "#3C3C3D",
   iconUrl: "https://cdn.coinranking.com/rk4RKHOuW/eth.svg"
}, {
   id: 14,
   symbol: "BNB",
   name: "Binance Coin",
   color: "#e8b342",
   iconUrl: "https://cdn.coinranking.com/B1N19L_dZ/bnb.svg"
}, {
   id: 71983,
   symbol: "DOT***",
   name: "Polkadot",
   color: "#d64cA8",
   iconUrl: "https://cdn.coinranking.com/RsljYqnbu/polkadot.svg"
}, {
   id: 8,
   symbol: "USDT",
   name: "Tether",
   color: "#22a079",
   iconUrl: "https://cdn.coinranking.com/mgHqwlCLj/usdt.svg"
}, {
   id: 9,
   symbol: "ADA",
   name: "Cardano",
   color: "#3cc8c8",
   iconUrl: "https://cdn.coinranking.com/ryY28nXhW/ada.svg"
}, {
   id: 3,
   symbol: "XRP",
   name: "XRP",
   color: "#000000",
   iconUrl: "https://cdn.coinranking.com/B1oPuTyfX/xrp.svg"
}, {
   id: 7,
   symbol: "LTC",
   name: "Litecoin",
   color: "#345d9d",
   iconUrl: "https://cdn.coinranking.com/BUvPxmc9o/ltcnew.svg"
}, {
   id: 59,
   symbol: "LINK",
   name: "Chainlink",
   color: "#4680b0",
   iconUrl: "https://cdn.coinranking.com/9NOP9tOem/chainlink.svg"
}, {
   id: 4,
   symbol: "BCH",
   name: "Bitcoin Cash",
   color: "#8dc451",
   iconUrl: "https://cdn.coinranking.com/By8ziihX7/bch.svg"
}, {
   id: 5858,
   symbol: "WETH",
   name: "Wrapped Ether",
   color: "#303030",
   iconUrl: "https://cdn.coinranking.com/KIviQyZlt/weth.svg"
}, {
   id: 6,
   symbol: "XLM",
   name: "Stellar",
   color: "#000000",
   iconUrl: "https://cdn.coinranking.com/78CxK1xsp/Stellar_symbol_black_RGB.svg"
}, {
   id: 1760,
   symbol: "USDC",
   name: "USDC",
   color: '#808080',
   iconUrl: "https://cdn.coinranking.com/jkDf8sQbY/usdc.svg"
}, {
   id: 20,
   symbol: "DOGE",
   name: "Dogecoin",
   color: "#c2a633",
   iconUrl: "https://cdn.coinranking.com/H1arXIuOZ/doge.svg"
}, {
   id: 72821,
   symbol: "UNI***",
   name: "Uniswap",
   color: "#ff007a",
   iconUrl: "https://cdn.coinranking.com/1heSvUgtl/uniswap-v2.svg?size=48x48"
}, {
   id: 10607,
   symbol: "WBTC***",
   name: "Wrapped BTC",
   color: '#808080',
   iconUrl: "https://cdn.coinranking.com/o3-8cvCHu/wbtc[1].svg"
}, {
   id: 62458,
   symbol: "LUNA*",
   name: "Terra",
   color: '#808080',
   iconUrl: "https://cdn.coinranking.com/F-PJdF8Um/LUNA.svg"
}, {
   id: 4966,
   symbol: "ATOM*",
   name: "Cosmos",
   color: "#5064fb",
   iconUrl: "https://cdn.coinranking.com/HJzHboruM/atom.svg"
}, {
   id: 74883,
   symbol: "AAVE*",
   name: "Aave",
   color: "#B6509E",
   iconUrl: "https://cdn.coinranking.com/4bpYKqV4X/AAVE.png"
}, {
   id: 5331,
   symbol: "HEX",
   name: "HEX",
   color: "#ffcd00",
   iconUrl: "https://cdn.coinranking.com/iseN4Am58/hex-vector.svg"
}, {
   id: 5,
   symbol: "EOS",
   name: "EOS",
   color: "#443f54",
   iconUrl: "https://cdn.coinranking.com/PqOYrWSje/eos2.svg"
}, {
   id: 10,
   symbol: "XMR",
   name: "Monero",
   color: "#ff7519",
   iconUrl: "https://cdn.coinranking.com/Syz-oSd_Z/xmr.svg"
}, {
   id: 4875,
   symbol: "BSV",
   name: "Bitcoin SV",
   color: "#eab300",
   iconUrl: "https://cdn.coinranking.com/388ehh6kq/bitcoin-sv-1.svg"
}, {
   id: 12,
   symbol: "MIOTA",
   name: "IOTA",
   color: "#000",
   iconUrl: "https://cdn.coinranking.com/H1IQ9Bdd-/miota.svg"
}, {
   id: 11,
   symbol: "TRX",
   name: "TRON",
   color: "#eb0029",
   iconUrl: "https://cdn.coinranking.com/behejNqQs/trx.svg"
}, {
   id: 14585,
   symbol: "ALGO",
   name: "Algorand",
   color: '#808080',
   iconUrl: "https://cdn.coinranking.com/lzbmCkUGB/algo.svg"
}, {
   id: 78340,
   symbol: "GRT***",
   name: "The Graph",
   color: '#808080',
   iconUrl: "https://cdn.coinranking.com/g6FVr-7Vs/grt.png"
}, {
   id: 18,
   symbol: "XTZ",
   name: "Tezos",
   color: "#2c7df7",
   iconUrl: "https://cdn.coinranking.com/HkLUdilQ7/xtz.svg"
}, {
   id: 1524,
   symbol: "OKB",
   name: "OKB",
   color: "#2d60e0",
   iconUrl: "https://cdn.coinranking.com/BJcjC5rCQ/Okex.svg"
}, {
   id: 96,
   symbol: "THETA",
   name: "Theta Token",
   color: "#1b1f2a",
   iconUrl: "https://cdn.coinranking.com/HJHg2k9Lf/theta.svg"
}, {
   id: 71,
   symbol: "HT",
   name: "Huobi Token",
   color: "#2daadf",
   iconUrl: "https://cdn.coinranking.com/ryFpQe0c7/ht.svg"
}, {
   id: 19,
   symbol: "VET",
   name: "VeChain",
   color: "#4bc0fa",
   iconUrl: "https://cdn.coinranking.com/B1_TDu9Dm/VEN.svg"
}, {
   id: 15,
   symbol: "NEO",
   name: "NEO",
   color: "#aedb00",
   iconUrl: "https://cdn.coinranking.com/MgUNVQCeN/neo.svg"
}, {
   id: 17,
   symbol: "XEM",
   name: "NEM",
   color: "#67b2e8",
   iconUrl: "https://cdn.coinranking.com/Bkvu9rOOZ/xem.svg"
}, {
   id: 10883,
   symbol: "SNX",
   name: "Synthetix Network",
   color: '#808080',
   iconUrl: "https://cdn.coinranking.com/c2WntZSPs/snx-synthetix.png"
}, {
   id: 13,
   symbol: "DASH",
   name: "Dash",
   color: "#1c75bc",
   iconUrl: "https://cdn.coinranking.com/PyCmduSxt/Dash-D-white_on_blue_circle.svg"
}, {
   id: 70974,
   symbol: "AVAX",
   name: "Avalanche",
   color: "#e84242",
   iconUrl: "https://cdn.coinranking.com/S0C6Cw2-w/avax-avalanche.png"
}, {
   id: 10296,
   symbol: "CRO",
   name: "Crypto.com Chain",
   color: "#01275d",
   iconUrl: "https://cdn.coinranking.com/2o91jm73M/cro.svg"
}, {
   id: 68905,
   symbol: "SOL*",
   name: "Solana",
   color: '#808080',
   iconUrl: "https://cdn.coinranking.com/yvUG4Qex5/solana.svg"
}, {
   id: 62569,
   symbol: "FTT**",
   name: "FTX Token",
   color: '#808080',
   iconUrl: "https://cdn.coinranking.com/WyBm4_EzM/ftx-exchange.svg"
}, {
   id: 22,
   symbol: "MKR",
   name: "Maker",
   color: "#1abc9c",
   iconUrl: "https://cdn.coinranking.com/sjHfS7jCS/mkrdao.svg"
}, {
   id: 72103,
   symbol: "SUSHI",
   name: "SUSHI",
   color: '#808080',
   iconUrl: "https://cdn.coinranking.com/eKKejWkdo/sushiswap.png"
}, {
   id: 74500,
   symbol: "FIL",
   name: "Filecoin",
   color: "#0090ff",
   iconUrl: "https://cdn.coinranking.com/vUmvv-IQA/FIL3-filecoin.svg?size=48x48"
}, {
   id: 68589,
   symbol: "DAI",
   name: "Dai",
   color: '#808080',
   iconUrl: "https://cdn.coinranking.com/mAZ_7LwOE/mutli-collateral-dai.svg"
}, {
   id: 4303,
   symbol: "CEL",
   name: "Celsius Network",
   color: "#f37425",
   iconUrl: "https://cdn.coinranking.com/XPU7TeCYD/New-CEL.png"
}, {
   id: 57612,
   symbol: "KSM",
   name: "Kusama",
   color: '#effff',
   iconUrl: "https://cdn.coinranking.com/HhSqAIEpK/kusama[1].svg"
}, {
   id: 21,
   symbol: "ZEC",
   name: "Zcash",
   color: "#000",
   iconUrl: "https://cdn.coinranking.com/rJrKiS_uZ/zec.svg"
}, {
   id: 70838,
   symbol: "COMP**",
   name: "Compound",
   color: "#00d395",
   iconUrl: "https://cdn.coinranking.com/2es4I0GGs/compound-icon.svg"
}, {
   id: 16,
   symbol: "ETC",
   name: "Ethereum Classic",
   color: "#699070",
   iconUrl: "https://cdn.coinranking.com/rJfyor__W/etc.svg"
}, {
   id: 14066,
   symbol: "BUSD",
   name: "BUSD ",
   color: "#f0b90b",
   iconUrl: "https://cdn.coinranking.com/6SJHRfClq/busd.svg"
}]

