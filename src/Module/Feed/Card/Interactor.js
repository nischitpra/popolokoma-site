import {url} from '../../../Network/URL'
import {id} from '../../../Values/Constants'
import Prefs from '../../../Prefs'
class Interactor {
    presenter
    constructor(presenter){
        this.presenter=presenter
    }
    fetchSentimentTrend(){
        fetch(url.api.twitter.sentiment,{
			method: 'GET',
			headers: {
			  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
			  "Accept": 'application/json',
            }
        }).then(response=>{
            this.presenter.stopLoading()
            response.json().then(json=>{
                this.presenter.loadSentiment(json[id.message])
            })
        }).catch((error)=>{
            console.log(`error: ${JSON.stringify(error)}`)
            this.presenter.stopLoading()
        })
    }
    getFavouritesList(){
        return Prefs.getFavouritesList()
    }
    setFavouritesList(favouritesList){
        Prefs.addCoinListToFavourites(favouritesList)
    }
    getSnapshot(from,to){
        this.presenter.startLoading()
        fetch(url.api.binance.snapshot(from,to),{
			method: 'GET',
			headers: {
			  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
			  "Accept": 'application/json',
            }
        }).then(response=>{
            this.presenter.stopLoading()
            response.json().then(json=>{
                this.presenter.setSnapshot(json[id.message])
            })
        }).catch((error)=>{
            console.log(`error: ${JSON.stringify(error)}`)
            this.presenter.stopLoading()
        })
    }
}

export default Interactor