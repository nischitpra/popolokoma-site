import {url} from '../../Network/URL'
import {id} from '../../Values/Constants'
class Interactor {
    constructor(presenter){
        this.presenter=presenter
    }
    getTrend(from,to){
        this.presenter.startLoading()
        console.log(url.api.cc.getTrendSummary(from,to))
        fetch(url.api.cc.getTrendSummary(from,to),{
			method: 'GET',
			headers: {
			  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
			  "Accept": 'application/json',
            }
        }).then(response=>{
            this.presenter.stopLoading()
            response.json().then(json=>{
                this.presenter.setTrendData(json[id.message])
                if(json[id.message][id.trendSummary.trend].length>0){
                    this.getPriceData(from,to,json[id.message][id.trendSummary.trend][0][id.trendSummary.startTime],json[id.message][id.trendSummary.trend][json[id.message][id.trendSummary.trend].length-1][id.trendSummary.endTime])
                }
            })
        }).catch((error)=>{
            console.log(`error: ${JSON.stringify(error)}`)
            this.presenter.stopLoading()
        })
    }
    getPriceData(from,to,fromTime,toTime){
        this.presenter.startLoading()
        console.log(url.api.binance.candlestick(from,to,id.binance.candle_interval._1h,fromTime,toTime,false))
        fetch(url.api.binance.candlestick(from,to,id.binance.candle_interval._1h,fromTime,toTime,false),{
			method: 'GET',
			headers: {
			  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
			  "Accept": 'application/json',
            }
        }).then(response=>{
            this.presenter.stopLoading()
            response.json().then(json=>{
                this.presenter.setPriceData(json[id.message])
            })
        }).catch((error)=>{
            console.log(`error: ${JSON.stringify(error)}`)
            this.presenter.stopLoading()
        })
    }
}

export default Interactor