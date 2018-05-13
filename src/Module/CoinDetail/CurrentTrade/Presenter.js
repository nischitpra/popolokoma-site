import Interactor from "./Interactor";
import {id,value} from "../../../Values/Constants"

const MAX_BUFFER_SIZE=10
class Presenter{
    script
    interactor=new Interactor(this)
    constructor(script){
        this.script=script
        this.buy_bufferList=[]
        this.sell_bufferList=[]
        this.lastUpdateBuy=0;
        this.lastUpdateSell=0;
    }
    subscribe(){
        this.interactor.subscribe(this.script.state.from,this.script.state.to)
    }
    unsubscribe(){
        this.interactor.unsubscribe(this.script.state.from,this.script.state.to)
    }
    setCurrentTrade(data){
        var d={
            [id.exchange]:data[1],
            [id.type]:data[4],
            [id.id]:data[5],
            [id.timestamp]:data[6],
            [id.quantity]:data[7],
            [id.price]:data[8],
        }
        if(d.type==id.buy){
            this.buy_bufferList.unshift(d)
        }
        if(d.type==id.sell){
            this.sell_bufferList.unshift(d)
        }
        const buyTimeDifference=new Date().getTime()-this.lastUpdateBuy
        if(this.buy_bufferList.length>MAX_BUFFER_SIZE || buyTimeDifference>value.bufferInterval){
            this.setBuyDataToState()
        }
        const sellTimeDifference=new Date().getTime()-this.lastUpdateSell
        if(this.sell_bufferList.length>MAX_BUFFER_SIZE ||  sellTimeDifference>value.bufferInterval){
            this.setSellDataToState()
        }
    }
    setBuyDataToState(){
        var list=this.script.state.buy
        if(this.buy_bufferList.length<MAX_BUFFER_SIZE){
            list=this.buy_bufferList.concat(list)
            list=list.slice(0,MAX_BUFFER_SIZE)
        }else{
            list=this.buy_bufferList
        }
        this.script.setState({
            buy:list,
        })
        this.buy_bufferList=[]
        this.lastUpdateBuy=new Date().getTime()
    }
    setSellDataToState(){
        var list=this.script.state.sell
        if(this.sell_bufferList.length<MAX_BUFFER_SIZE){
            list=this.sell_bufferList.concat(list)
            list=list.slice(0,MAX_BUFFER_SIZE)
        }else{
            list=this.sell_bufferList
        }
        this.script.setState({
            sell:list,
        })
        this.sell_bufferList=[]
        this.lastUpdateSell=new Date().getTime()
    }
}

export default Presenter