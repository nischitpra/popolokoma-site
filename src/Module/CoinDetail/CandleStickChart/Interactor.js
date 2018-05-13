import {url} from '../../../Network/URL'
import Prefs from '../../../Prefs'
import {id} from '../../../Values/Constants'
import {value} from '../../../Values/Constants'
class Interactor{
    presenter
    constructor(presenter){
        this.presenter=presenter
    }
    
    getSnapshot(from,to){
        fetch(url.api.binance.snapshot(from,to),{
			method: 'GET',
			headers: {
			  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
			  "Accept": 'application/json',
            }
        }).then(response=>{
            if(response.ok){
                response.json().then(json=>{
                    if(json[id.status]===value.status.ok){
                        this.presenter.setSnapshot(json[id.message])
                    }else{
                        this.presenter.setSnapshot({[id.snapshot.volume]:'-',[id.snapshot.quoteVolume]:'-',[id.snapshot.openPrice]:'-',[id.snapshot.highPrice]:'-',[id.snapshot.lowPrice]:'-',[id.snapshot.priceChange]:'-',[id.snapshot.priceChangePercent]:'-'})
                    }
                })
            }
        }).catch(error=>{
            this.presenter.stopLoading()
            console.log(`error: ${error}`)
        })
    }


    /**
     * returns the high, low, volume of the coin pair
     */
    fetchTodaySnapshot(from,to,exchange){
        fetch(url.api.favourites(from,to,exchange),{
			method: 'GET',
			headers: {
			  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
			  "Accept": 'application/json',
            }
        }).then(response=>{
            if(response.ok){
                response.json().then(json=>{
                    if(json[id.status]===value.status.ok){
                        this.presenter.setSnapshot(json[id.message][from][to])
                    }else{
                        this.presenter.setSnapshot({[id.price]:'-',[id.volume]:'-',[id.open]:'-',[id.high]:'-',[id.low]:'-',})
                    }
                })
            }
        }).catch(error=>{
            this.presenter.stopLoading()
            console.log(`error: ${error}`)
        })
    }
    fetchCandleStick(from,to,interval,fromTime,toTime,isNew){
        console.log('CandleStickChart: ' +url.api.binance.candlestick(from,to,interval,fromTime,toTime,isNew))
        fetch(url.api.binance.candlestick(from,to,interval,fromTime,toTime,isNew),{
			method: 'GET',
			headers: {
			  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
			  "Accept": 'application/json',
            }
        }).then(response=>{
            response.json().then(json=>{
                this.presenter.loadCandleStick(json[id.params.type],json[id.message],isNew)
                this.presenter.stopLoading()
            })
        }).catch((error)=>{
            this.presenter.unlockLoadMore()
            this.presenter.stopLoading()
            console.log(`error: ${JSON.stringify(error)}`)
            console.log(`retrying to reload data for chart... `)
        })
    }
    fetchTradingPrice(historyType,from,to,exchange){
        var toTime=Math.ceil(new Date().getTime()/1000)
        console.log('CandleStickChart: ' +url.api.history(historyType,from,to,exchange,toTime))
        fetch(url.api.history(historyType,from,to,exchange,toTime),{
			method: 'GET',
			headers: {
			  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
			  "Accept": 'application/json',
            }
        }).then(response=>{
            response.json().then(json=>{
                this.presenter.loadTradeHistory(parseInt(json[id.cryptoCompare.historyType]),json[id.message])
                this.presenter.stopLoading()
            })
        }).catch((error)=>{
            this.presenter.stopLoading()
            console.log(`error: ${JSON.stringify(error)}`)
            console.log(`retrying to reload data for chart... `)
        })
    }
    fetchOlderTradingPrice(historyType,from,to,exchange,toTime){
        console.log('CandleStickChart: older:  ' +url.api.history(historyType,from,to,exchange,toTime))
        fetch(url.api.history(historyType,from,to,exchange,toTime),{
			method: 'GET',
			headers: {
			  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
			  "Accept": 'application/json',
            }
        }).then(response=>{
            response.json().then(json=>{
                this.presenter.loadOlderTradeHistory(parseInt(json[id.cryptoCompare.historyType]),json[id.message])
                this.presenter.stopLoading()
            })
        }).catch((error)=>{
            this.presenter.stopLoading()
            console.log(`error: ${JSON.stringify(error)}`)
            console.log(`retrying to reload data for chart... `)
            // this.fetchTradingPrice(historyType,from,to,exchange)
        })
    }

    getToolbar(){
        return Prefs.getCandleStickToolbar()
    }
    setToolbar(toolbar){
        Prefs.setCandleStickToolbar(toolbar)
    }
    saveLine(from,to,list){
        const historyType=this.getToolbar().historyType
        const key=`${from}_${to}_${historyType}`
        var dataList=Prefs.getLine()
        dataList[key]=list
        Prefs.saveLine(dataList)
    }
    getLine(from,to){
        const historyType=this.getToolbar().historyType
        var line=Prefs.getLine()
        line=line[`${from}_${to}_${historyType}`]
        if(line===undefined||line===null){ 
            line=[] 
        }
        return line
    }

    exportTrendSet(trends,historyKey,datasetKey,callback){
        this.presenter.startExportLoading()
        console.log('export trend data')
        fetch(url.api.develop.exportTrendDataset,{
			method: 'POST',
			headers: {
			  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
              "Accept": 'application/json',
              'Content-Type' : 'application/json',
            },
            body: JSON.stringify({[id.params.trendData]:trends,[id.params.pairHistoryType]:historyKey,[id.params.datasetType]:datasetKey})
        }).then(response=>{
            response.json().then(json=>{
                this.presenter.stopExportLoading()
                callback(json[id.params.status],json[id.params.message])
            })
        }).catch((error)=>{
            this.presenter.stopExportLoading()
            console.log(`error: ${JSON.stringify(error)}`)
            console.log(`retrying to reload data for chart... `)
            // this.fetchTradingPrice(historyType,from,to,exchange)
        })
    }
}
export default Interactor