import Interactor from "./Interactor";
import {id} from '../../../Values/Constants'
class Presenter{
    constructor(script){
        this.script=script
        this.interactor=new Interactor(this)
    }

    setTweets(tweets){
        if(this.script!=undefined)
        this.script.setState({
            data:tweets
        })
    }
    getSpecificTweets(from){
        const favouriteDetails=this.interactor.getFavouritesDetailList()
        var coinName=''
        for(var i in favouriteDetails){
            const item=favouriteDetails[i]
            if(item[id.coinList.symbol]===from){
                coinName=item[id.coinList.coinName]
                break
            }
        }
        this.interactor.getSpecificTweets(coinName,from)
    }
    getGoodBadTweets(count){
        this.interactor.getGoodBadTweets(count)
    }
    getClusterTweets(){
        this.interactor.getClusterTweets()
    }
    setClusterTweets(data){
        if(this.script!=undefined){
            var cluster={}
            var total=0
            var clusterTweets={}
            for(var i in data){
                cluster[data[i].cluster]=cluster[data[i].cluster]==null?data[i].frequency:cluster[data[i].cluster]+data[i].frequency
                total+=data[i].frequency
                if(clusterTweets[data[i].cluster]==null){
                    clusterTweets[data[i].cluster]=[]
                }
                clusterTweets[data[i].cluster].push(data[i])
            }
            this.script.setState({
                cluster:Object.values(cluster),
                total:total,
                clusterTweets:Object.values(clusterTweets),
            })
        }
    }

    stopLoading(){
        if(this.script!=undefined)
        this.script.setState({
            isLoading:false,
        })
    }
    setGoodBadTweets(data){
        if(this.script!=undefined)
        this.script.setState({
            data:data
        })
    }
}

export default Presenter