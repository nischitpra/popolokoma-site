import {url} from '../../../Network/URL'
import {id} from '../../../Values/Constants'
import Prefs from '../../../Prefs'

class Interactor{
    constructor(presenter){
        this.presenter=presenter
    }
    getClusterTweets(){
        console.log(`getting cluster tweets`)
        // fetch(url.api.twitter.coinTweet(coinName,symbol),{
        fetch(url.api.twitter.clusterTweets,{
            method: 'GET',
			headers: {
			  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
              "Accept": 'application/json',
            //   "Authorization":string.api.twitterKeys(parseInt(new Date().getTime()/1000))
            }
        }).then(response=>{
            if(response.ok){
                response.json().then(json=>{
                    this.presenter.setClusterTweets(json[id.message])
                })
            }
            this.presenter.stopLoading()
        }).catch(error=>{
            this.presenter.stopLoading()
        })
    }

}

export default Interactor