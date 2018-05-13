import {url} from '../../Network/URL'
import {id} from '../../Values/Constants'
import {value} from '../../Values/Constants'
class Interactor {
    presenter
    constructor(presenter){
        this.presenter=presenter
    }
    getForecastHistory(from,to,type,exchange){
        fetch(url.api.cc.updateHistory(from,to,type,exchange),{
			method: 'GET',
			headers: {
			  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
			  "Accept": 'application/json',
            }
        }).then(response=>{
            response.json().then(json=>{
                if(json[id.status]===value.status.ok){
                    this.updateForecastHistory(from,to,type)
                }
            })
        }).catch((error)=>{
            console.log(`error: ${JSON.stringify(error)}`)
            this.presenter.stopLoading()
        })
    }
    updateForecastHistory(from,to,type){
        fetch(url.api.forecast.updateForecast(from,to,type),{
			method: 'GET',
			headers: {
			  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
			  "Accept": 'application/json',
            }
        }).then(response=>{
            response.json().then(json=>{
                if(json[id.status]===value.status.ok){
                    this.fetchForecastTrend(from,to,type)
                }
            })
        }).catch((error)=>{
            console.log(`error: ${JSON.stringify(error)}`)
            this.presenter.stopLoading()
        })
    }
    fetchForecastTrend(from,to,type){
        fetch(url.api.forecast.forecast(from,to,type),{
			method: 'GET',
			headers: {
			  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
			  "Accept": 'application/json',
            }
        }).then(response=>{
            this.presenter.stopLoading()
            response.json().then(json=>{
                this.presenter.loadForecast(json[id.message])
            })
        }).catch((error)=>{
            console.log(`error: ${JSON.stringify(error)}`)
            this.presenter.stopLoading()
        })
    }
}

export default Interactor