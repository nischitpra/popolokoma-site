import Interactor from './Interactor'
import {string,id} from '../../Values/Constants'
class Presenter{
    interactor=new Interactor(this)
    script
    constructor(script){
        this.script=script
    }
    init(refreshRate){
        this.fetchNewInterval()
        this.script.setState({
            interval:setInterval(()=>this.fetchNewInterval(),refreshRate),
        }) 
    }
    fetchNewInterval(){
        this.getSnapshot()
        this.getCoinList()
    }
    getSnapshot(){
        var fav=this.getFavouritesDetailList()
        console.log(JSON.stringify(fav))
        for(var i in fav){
            console.log(`${fav[i][id.coinList.from]},${fav[i][id.coinList.to]}`)
            this.interactor.getSnapshot(fav[i][id.coinList.from],fav[i][id.coinList.to])
        }
    }
    setSnapshot(data){
        var coinList=this.script.state.coinList
        if(coinList[string.mine].length>0){
            const name_list=coinList[string.mine].map(row=>row[id.snapshot.symbol])
            const i=name_list.indexOf(data[id.snapshot.symbol])
            if(i>-1){
                coinList[string.mine][i]=data
            }else{
                coinList[string.mine].push(data)
            }
        }else{
            coinList[string.mine].push(data)
        }
        this.script.setState({
            coinList:coinList,
        })
    }
    getCoinList(){
        this.interactor.getCoinList()
    }
    setCoinList(coinList){
        var btc=[]
        var bnb=[]
        var eth=[]
        var usdt=[]
        const mine=this.script.state.coinList[string.mine]

        for(var i in coinList){
            const len=coinList[i][id.snapshot.symbol].length
            if(coinList[i][id.snapshot.symbol].substring(len-3,len)===string.btc){
                coinList[i][id.snapshot.symbol]=coinList[i][id.snapshot.symbol].substring(0,len-3)
                btc.push(coinList[i])
            }else if(coinList[i][id.snapshot.symbol].substring(len-3,len)===string.eth){
                coinList[i][id.snapshot.symbol]=coinList[i][id.snapshot.symbol].substring(0,len-3)
                eth.push(coinList[i])
            }else if(coinList[i][id.snapshot.symbol].substring(len-3,len)===string.bnb){
                coinList[i][id.snapshot.symbol]=coinList[i][id.snapshot.symbol].substring(0,len-3)
                bnb.push(coinList[i])
            }else if(coinList[i][id.snapshot.symbol].substring(len-4,len)===string.usdt){
                coinList[i][id.snapshot.symbol]=coinList[i][id.snapshot.symbol].substring(0,len-4)
                usdt.push(coinList[i])
            }
        }
        coinList={
            [string.mine]:mine,
            [string.btc]:btc,
            [string.eth]:eth,
            [string.bnb]:bnb,
            [string.usdt]:usdt,
        }
        this.script.setState({
            coinList:coinList,
        })
    }
    getFavouritesList(){
        return this.interactor.getFavouritesList()
    }
    getFavouritesDetailList(){
        return this.interactor.getFavouritesDetailList()
    }
    addCoinListToFavourites(coinList){
        this.interactor.addCoinListToFavourites(coinList)
    }
    setFavouritesDetailList(coinDetailList){
        this.interactor.setFavouritesDetailList(coinDetailList)
    }
    stopLoading(){
        this.script.setState({
            isLoading:false,
        })
    }
}
export default Presenter