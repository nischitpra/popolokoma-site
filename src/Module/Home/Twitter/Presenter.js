import Interactor from "./Interactor";
import {id} from '../../../Values/Constants'
class Presenter{
    constructor(script){
        this.script=script
        this.interactor=new Interactor(this)
    }

    setTweets(tweets){
        // var dataList=this.script.state.data
        // var list=[]
        // data=data.map(item=>{
            // list.push(item) 
        // })

        // dataList=dataList.concat(list)
        this.script.setState({
            // data:dataList
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
    stopLoading(){
        this.script.setState({
            isLoading:false,
        })
    }
    setGoodBadTweets(data){
        this.script.setState({
            data:data
        })
    }
}

export default Presenter