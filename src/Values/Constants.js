import React from 'react'
export const value={
    ipAddress:'localhost:3001',
    ipAddressSocket:'localhost:3002',
    base_api:false?`http://172.17.39.67:3004`:`https://poposerver.herokuapp.com`,
    newsApiKey:'d2a968870c6c41e0b2f172bad1c2ef10',
    subscriptionRefreshRate:0,
    // buffer interval used to update current trade price in coin detail in milliseconds
    bufferInterval:1.5*1000,
    chartHeightRatio:0.75,
    isMobile:window.innerWidth<=800,
    cryptoCompare:{
        unsubscribe:'1'
    },
    status:{
        ok:'ok',
        error:'error',
    },
    binance:{
        candle_interval:{   
            _1m:1000*60*1, //minute
            _3m:1000*60*3,
            _5m:1000*60*5,
            _15m:1000*60*15,
            _30m:1000*60*30,
            _1h:1000*60*60*1,  //hour
            _2h:1000*60*60*2,
            _4h:1000*60*60*4,
            _6h:1000*60*60*6,
            _8h:1000*60*60*8,
            _12h:1000*60*60*12,
            _1d:1000*60*60*24*1, //day
            _3d:1000*60*60*24*3,
            _1w:1000*60*60*24*7, //week
            _1M:1000*60*60*24*30, //month
        }
    },
    feed:{swip_memory:3},
}

export const string={
    projectName:'Popolokoma',
    dataEmpty:'Nothing to show',
    sentimentTrend:'Sentiment Trend',
    trendSummary:'4 Day Trend Summary',
    forecastTrend:'Forecast Trend',
    favourites:{
        isEmpty:'Your favourites list is empty. Please add currency from Add-Remove Coin section',
    },
    changeStick:{
        subscribed:'unsubscribe',
        notSubscribed:'subscribe'
    },
    toolbar:{
        enterOtp:'Enter OTP',
        enterEmail:'Enter Email',
        submit:'Submit',
    },

    mine:'MINE',
    btc:'BTC',
    eth:'ETH',
    bnb:'BNB',
    usdt:'USDT',
    usd:'USD',
    inr:'INR',
    cnd:'CND',
    iota:'IOTA',
    xrp:'XRP',
    ltc:'LTC',
    dash:'DASH',
    eos:'EOS',
    gas:'GAS',
    coe:'COE',
    poe:'POE',
    ada:'ADA',
    deep:'DEEP',
    air:'AIR',

    high24:"High 24",
    low24:"Low 24",
    volume24:(symbol)=>`Vol 24h from ${symbol}`,
    volume24To:(symbol)=>`Vol 24h to ${symbol}`,
    symbol:"Symbol",

    minute:'M',
    hour:'H',
    day:'D',

    // for home trend indicator
    rising:'U',
    falling:'D',
    consolidating:'C',
    
    // for chart indicators
    areaChart:'Area',
    volumeBar:'Volume',
    sma:'SMA',
    ema:'EMA',
    macd:'MACD',
    rsi:'RSI',
    atr:'ATR',
    stochasticOscillator:'STO',
    elderRay:'ER',
    parabolicSAR:'SAR',
    bollingerBand:'BB',
    horizontalLine:'Line',

    drawLine:'Draw',
    deleteLine:'Delete',

    // name of crypto exchanges
    cccagg:'CCCAGG',
    coinbase:'Coinbase',
    binance:'Binance',
    btcXIndia:'BTCXIndia',
    bithumb:'Bithumb',
    karken:'Kraken',

    exchange:'Exchange',
    type:'Buy/Sell',
    id:'Order Id',
    timestamp:'Time',
    quantity:'Quantity',
    price:'Rate',

    // toggle
    toggleOn:'HIDE',
    toggleOff:'SHOW',
    delete:'DELETE',

    // for home news
    trendFilter:'Trend Filter',
    headlines:'HeadLines',
    other:'Other',
    news:'News',
    twitter:'Twitter',
    
    trend:{
        rise:'Rise',
        fall:'Fall',
        consolidate:'Conso',
        all:'All',
        trend:'Trend',
        from:'F',
        to:'T',
        confidence:'Confidence',
        startTime:'ST',
        endTime:'ET',
        velocity:'Velocity',
        _4day_summary:'4 Days Summary',
    },
    cc:{
        open:'Open',
        high:'High',
        low:'Low',
        close:'Close',
        volume:'Volume',
        change:'Change',
        priceMovement:'Price Movement',
        snapshot:'Snapshot',
    },


    // for snapshot used in coin details to show today summary
    // snapshot:(price,open,high,low,volume)=>`Price:${price} | Open:${open} | High:${high} | Low:${low} | Volume:${volume}`,
    snapshot:(priceChange,open,high,low,volume,percentageChange)=><span>Change: <b><span className={parseFloat(priceChange)>0?'snapshot-green-text':parseFloat(priceChange)<0?'snapshot-red-text':''}>{priceChange}</span></b> (<b><span className={parseFloat(priceChange)>0?'snapshot-green-text':parseFloat(priceChange)<0?'snapshot-red-text':''}>{percentageChange}%</span></b>)| Open: <b>{open}</b> | High: <b>{high}</b> | Low: <b>{low}</b> | Volume: <b>{volume}</b></span>,
    snapshot_mobile:(priceChange,open,high,low,volume,percentageChange)=><span>Change: <b><span className={parseFloat(priceChange)>0?'snapshot-green-text':parseFloat(priceChange)<0?'snapshot-red-text':''}>{priceChange}</span></b> (<b><span className={parseFloat(priceChange)>0?'snapshot-green-text':parseFloat(priceChange)<0?'snapshot-red-text':''}>{percentageChange}%</span></b>)| Open: <b>{open}</b> <br/> High: <b>{high}</b> | Low: <b>{low}</b> <br/> Volume: <b>{volume}</b></span>,

    // strings used for api call
    api:{
        historyMinute:0,
        historyHour:1,
        historyDay:2,
        getHeader:{method: 'GET',headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
            "Accept": 'application/json',}},
        trades:'TRADES',
        current:'CURRENT',
        currentAgg:'CURRENTAGG',


        // for news
        everything:'everything',
        headlines:'top-headlines',

        // twitter authentication key
        twitterKeys:(time)=>`OAuth oauth_consumer_key="q3RPMgFxS26kHOUfSl2qOCt3w",oauth_token="941802374707822592-kLwiBWC7k6Bdqu2Gg5NkFymyKtOJbfU",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${time}",oauth_nonce="EtTRQd",oauth_version="1.0",oauth_signature="Kv5WaqTitvD5iLmmDUAzhCbn8KQ%3D"`
        
    },
    historyType:['Minute','Hour','Day'],

    // Network error alert
    alert_networkError:'Something went wrong!',

    done:'Done',
    update:'Update',
    fast:'Fast',
    medium:'Middle',
    slow:'Slow',
    signal:'Signal',
    windowSize:'Window Size',
    kWindowSize:'kWindow Size',
    dWindowSize:'dWindow Size',
    

    up:'Up',
    down:'Down',
    nochange:'No Change',
    //portfolio flag value
    flag:(value)=>{
        if(value===id.up) return string.up
        else if(value===id.down) return string.down
        else if(value===id.nochange) return string.nochange
    }, 

    navbar:{
        home:'Home',
        favourites:'Favourites',
        coinList:'Portfolio',
        feed:'Feed',
        url:{home:'',favourites:'favourites',coinList:'coinList',feed:'feed'}
    },


    readFullArticle:'Read Full Article Here',

}

export const array={ 
    // CurrencyList:[string.btc, string.eth, string.usd, string.cnd, string.iota, string.xrp, string.ltc, 
    //     string.dash, string.eos, string.gas, string.coe, string.poe, string.ada, string.deep, string.air],
    CurrencyList:[string.cnd, string.iota, string.xrp, string.ltc, 
            string.dash, string.eos, string.gas, string.coe, string.poe, string.ada, string.deep, string.air],

    // ExchangeList:[string.cccagg,string.binance],
    // ExchangeFromList:[string.btc,string.eth,string.usd,string.inr],
    ExchangeList:[string.binance],
    ExchangeFromList:[string.mine,string.btc,string.eth,string.usdt],

}



export const id={
    news:{everything:0,headlines:1,articles:'articles'},
    params:{
        trendData:'trendData',
        pairHistoryType:'pairHistoryType',
        datasetType:'datasetType',
        status:'status',
        message:'message',
        count:'count', 
        from:'f',
        to:'t',
        coinName:'coinName',
        type:'type',
        exchange:'e',
        toTime:'tt',
        fromTime:'ft',
        isNew:'n',
    },
    binance:{
        candle_interval:{   
            _1m:'1m', //minute
            _3m:'3m',
            _5m:'5m',
            _15m:'15m',
            _30m:'30m',
            _1h:'1h',  //hour
            _2h:'2h',
            _4h:'4h',
            _6h:'6h',
            _8h:'8h',
            _12h:'12h',
            _1d:'1d', //day
            _3d:'3d',
            _1w:'1w',
            _1M:'1M', //month
        },
        id:'_id',
    },
    key:{
        historyType:(from,to,type)=>`${from}_${to}_${type}`,
        from_to:(from,to)=>`${from}_${to}`,
    },
    status:'status',
    cryptoCompare:{
        clientEvent:'clientEvent',
        serverEvent:'serverEvent',
        from:'from',
        to:'to',
        unsubscribe:'un',
        historyType:'historyType',
    },
    toolbar:{
        email:'email',
        otp:'otp',
    },
    history:{
        open:'open',
        high:'high',
        low:'low',
        close:'close',
        minute:0,
        hour:1,
        day:2,
    },

    areaChart:0,
    volumeBar:1,
    sma:2,
    ema:3,
    macd:4,
    rsi:5,
    atr:6,
    stochasticOscillator:7,
    elderRay:8,
    parabolicSAR:9,
    bollingerBand:10,
    horizontalLine:11,
    fast:'fast',
    medium:'medium',
    slow:'slow',
    signal:'signal',
    windowSize:'windowSize',
    kWindowSize:'kWindowSize',
    dWindowSize:'dWindowSize',
    drawLine:12,
    deleteLine:13,
    red:14,
    green:15,
    blue:16,

    // this is for CurrentTrade in CoinDetails and Favourites(portfolio) in MainTable
    exchange:'exchange',   
    type:'type',           
    id:'id',               
    timestamp:'timestamp', 
    quantity:'quantity',   
    price:'price',
    buy:1,
    sell:2,
    unknown:4,
    average:'average',
    flag:'flag',
    lastTradeVolume:'lastTradeVolume',
    lastTradeVolumeTo:'lastTradeVolumeTo',
    lastTradeId:'lastTradeId',
    volumeHour:'volumeHour',
    volumeTo:'volumeTo',
    openDay:'openDay',
    highDay:'highDay',
    lowDat:'lowDat',
    //portfolio flag value
    up:1,
    down:2,
    nochange:4,

    volume:'volume',
    open:'open',
    high:'high',
    low:'low',
    close:'close',
    percentageChange:'percentageChange',

    coinList:{
        symbol:'symbol',
        coinName:'coinName',
        from:'from',
        to:'to',
    },
    
    // for news
    headlines:1,
    everything:2,

    // coin pair snapshot
    snapshot:{
        price:'PRICE',
        volume24:'VOLUME24HOUR',
        volume24to:'VOLUME24HOURTO',
        open:'OPEN24HOUR',
        high:'HIGH24HOUR',
        low:'LOW24HOUR',
        symbol:'symbol',
        priceChange:'priceChange',
        priceChangePercent:'priceChangePercent',
        weightedAvgPrice:'weightedAvgPrice',
        prevClosePrice:'prevClosePrice',
        lastPrice:'lastPrice',
        lastQty:'lastQty',
        bidPrice:'bidPrice',
        bidQty:'bidQty',
        askPrice:'askPrice',
        askQty:'askQty',
        openPrice:'openPrice',
        highPrice:'highPrice',
        lowPrice:'lowPrice',
        volume:'volume',
        quoteVolume:'quoteVolume',
        openTime:'openTime',
        closeTime:'closeTime',
        firstId:'firstId',
        lastId:'lastId',
        count:'count',
    },

    // message from server
    message:'message',
    tiwtter:{
        statuses:'statuses',
        tweet:{
            tweet:'tweet',
        }
    },
    trendSummary:{
        trend:'trend',
        volatility:'volatility',
        startTime:'start_time',
        endTime:'end_time',
    },
    trend:{
        rise:'1',
        consolidate:'0',
        fall:'-1',
        all:'2',
    },


    storage:{
        favourites:'0',
        toolbar:'1',
        portfolioCoinTab:'2',
        currentExchange:'3',
        navbarTab:'4',
        subToolbar:'5',
        sma:6,
        ema:7,
        macd:8,
        rsi:9,
        atr:10,
        stochasticOscillator:11,
        elderRay:12,
        subToolbarOpen:13,
        lines:14,
        favouritesDetail:15,
        email:16,
    }
}

export default string