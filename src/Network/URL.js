import {value} from '../Values/Constants'
export const url={
    own:{
        base:'http://localhost:3000',
        candle_chart:(from,to)=>`/favourites&f=${from}&t=${to}`,
        ws_strategyFilter:'ws://192.168.43.60:9005',
    },
    api:{
        favourites:(fromList,toList,exchange)=>`${value.base_api}/cc/favourites?from=${fromList}&to=${toList}&exchange=${exchange}`,
        history:(historyType,from,to,exchange,toTime)=>`${value.base_api}/cc/history?historyType=${historyType}&from=${from}&to=${to}&exchange=${exchange}&toTime=${toTime}`,
        coinList:`${value.base_api}/cc/coinlist`,
        cryptocompareWebSocket:`http://${value.ipAddressSocket}`,
        socketSubsList:(from,to)=>`${value.base_api}/cc/subs?from=${from}&to=${to}`,
        news:(type,count,page)=>`${value.base_api}/news?i=${type}&c=${count}&p=${page}`,
        isSubscribed:(email,from,to)=>`${value.base_api}/m/subscribe/subscribed?email=${email}&from=${from}&to=${to}`,
        subscribe:(email,from,to)=>`${value.base_api}/m/subscribe?email=${email}&from=${from}&to=${to}`,
        subscribeOtp:(email,from,to,otp)=>`${value.base_api}/m/subscribe/validate?email=${email}&from=${from}&to=${to}&otp=${otp}`,
        unsubscribe:(email,from,to)=>`${value.base_api}/m/subscribe/unsubscribe?email=${email}&from=${from}&to=${to}`,
        twitter:{
            userTimeline:(postId)=>`https://twitter.com/statuses/${postId}`,
            sentiment:`${value.base_api}/twitter/s`,
            goodBadTweet:`${value.base_api}/twitter/ggb`,
            coinTweet:(coinName,symbol)=>`${value.base_api}/twitter/q?coinName=${coinName}&symbol=${symbol}`,
            allTweet:`${value.base_api}/twitter/h`,
            getFewGBTweets:(count)=>`${value.base_api}/twitter/ggbf?count=${count}`,
            specificTweets:(coinName,from,to)=>`${value.base_api}/twitter/q?coinName=${coinName}&f=${from}`,
            clusterTweets:`${value.base_api}/twitter/gct`,
        },
        exchange:{
            candles:(from,to,window)=>`https://api.bitfinex.com/v2/candles/trade:${window}:t${from}${to}/hist`,
            
        },
        binance:{
            candlestick:(from,to,interval,fromTime,toTime,isNew)=>`${value.base_api}/cc/gcs?f=${from}&t=${to}&type=${interval}&ft=${fromTime}&tt=${toTime}&n=${isNew}`,
            snapshot:(from,to)=>`${value.base_api}/cc/t?f=${from}&t=${to}`,
            snapshotAll:`${value.base_api}/cc/t`,
            tradePage:(key)=>`https://www.binance.com/trade.html?symbol=${key}`,
            tradePageMobile:(key)=>`https://www.binance.com/indexSpa.html#/trade/index?symbol=${key}`,
        },
        forecast:{
            forecast:(from,to,type)=>`${value.base_api}/forecast/q?f=${from}&t=${to}&type=${type}`,
            updateForecast:(from,to,type)=>`${value.base_api}/forecast/uf?f=${from}&t=${to}&type=${type}`,
        },
        cc:{
            getFilterTrend:(filterType)=>`${value.base_api}/cc/gft?filt=${filterType}`,
            getTrendSummary:(from,to)=>`${value.base_api}/cc/gs?f=${from}&t=${to}`,
            feedList:`${value.base_api}/cc/gfl`,
            getLevels:(from,to)=>`${value.base_api}/cc/gtl?f=${from}&t=${to}`,
            getStopLossLevel:`${value.base_api}/cc/gsll`,
        },
        develop:{
            exportTrendDataset:`${value.base_api}/cc/exportDataset`,
        }


    },
} 