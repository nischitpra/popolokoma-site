import {url} from '../../Network/URL'
import {id,string} from '../../Values/Constants'
import Prefs from '../../Prefs'

class Interactor{
    constructor(presenter){
        this.presenter=presenter
    }
    getSnapshot(from,to){
        console.log(url.api.binance.snapshot(from,to))
        fetch(url.api.binance.snapshot(from,to),{
			method: 'GET',
			headers: {
			  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
              "Accept": 'application/json',
            }
        }).then(response=>{
            if(response.ok){
                response.json().then(json=>{
                    this.presenter.setSnapshot(json[id.message])
                })
                this.presenter.stopLoading()
            }else{
                alert(string.alert_networkError);
                this.presenter.stopLoading()
            }
        })
    }
    getCoinList(){
        fetch(url.api.binance.snapshotAll,{
			method: 'GET',
			headers: {
			  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
              "Accept": 'application/json',
            }
        }).then(response=>{
            if(response.ok){
                response.json().then(json=>{
                    this.presenter.setCoinList(json[id.message])
                })
                this.presenter.stopLoading()
            }else{
                alert(string.alert_networkError);
                this.presenter.stopLoading()
            }
        })
    }
    getFavouritesList(){
        return Prefs.getFavouritesList()
    }
    addCoinListToFavourites(coinList){
        Prefs.addCoinListToFavourites(coinList)
    }
    getFavouritesDetailList(){
        return Prefs.getFavouritesDetailList()
    }
    setFavouritesDetailList(coinDetailList){
        Prefs.setFavouritesDetailList(coinDetailList)
    }
    
}
export default Interactor