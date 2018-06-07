import Interactor from './Interactor'
import { id, value } from '../../../Values/Constants';
class Presenter { 
    script
    interactor=new Interactor(this)
    constructor(script){
        this.script=script
    }
    init(from,to,exchange,refreshRate){
        clearInterval(this.script.state.interval)
        this.script.setState({
            interval:setInterval(()=>this.fetchNewInterval(from,to),refreshRate),
            enableTrendLine: false,
            trends_1: this.getLine(from,to),
        }) 
        this.fetchNewInterval(from,to)
    }
    getSnapshot(from,to){
        this.interactor.getSnapshot(from,to)
    }

    fetchNewInterval(from,to){
        console.log(`fetch new interval`)
        const type=this.getHistoryType();
        var fromTime=this.getStartTimeHistory(new Date().getTime(),500)
        if(type===id.binance.candle_interval._1m){
            fromTime = this.script.state.historyMinute.length>0?this.script.state.historyMinute[this.script.state.historyMinute.length-1][id.binance.id]:fromTime
        }else if(type===id.binance.candle_interval._1h){
            fromTime = this.script.state.historyHour.length>0?this.script.state.historyHour[this.script.state.historyHour.length-1][id.binance.id]:fromTime
        }else{
            fromTime = this.script.state.historyDay.length>0?this.script.state.historyDay[this.script.state.historyDay.length-1][id.binance.id]:fromTime
        }
        console.log(`from time: ${fromTime}`)
        this.fetchCandleStick(from,to,fromTime+1,new Date().getTime(),true)
        this.getSnapshot(from,to)
    }

    fetchCandleStick(from,to,fromTime,toTime,isNew){
        if(!this.script.state.loadmoreLock){
            this.lockLoadMore()
            console.log('fetching candle stick data')
            this.interactor.fetchCandleStick(from,to,this.getHistoryType(),fromTime,toTime,isNew)
        }else{
            console.log('download more has been locked. waiting for previous request to complete.')
        }
    }

    loadCandleStick(type,data,isNew){
        this.unlockLoadMore()
        if(data===undefined || data===null || data.length<1){
            console.log(`candle stick downloaded is null `)
            return
        }
        if(!Array.isArray(data)){
            console.log(`Not Array: ${data}`)
            return 
        }
        console.log(JSON.stringify(data))
        var prevData=[]
        if(type===id.binance.candle_interval._1m){ prevData = this.script.state.historyMinute }
        else if(type===id.binance.candle_interval._1h){ prevData = this.script.state.historyHour }
        else{ prevData = this.script.state.historyDay }
        
        if(prevData.length>0){
            if(isNew){
                prevData=this.getNewValueIndex(prevData,data)
            }else{
                prevData=this.getOldValueIndex(prevData,data)
            }
            data=prevData
        }

        if(type===id.binance.candle_interval._1m){
            this.script.setState({
                historyMinute:data,
            })
        }else if(type===id.binance.candle_interval._1h){
            this.script.setState({
                historyHour:data,
            })
        }else{
            this.script.setState({
                historyDay:data,
            })
        }
    }

    setSnapshot(data){
        var _value={}
        if(data[id.snapshot.volume]!==undefined||data[id.snapshot.openPrice]!==null){
            _value={
                [id.snapshot.volume]:`${data[id.snapshot.volume]}(B) : ${data[id.snapshot.quoteVolume]}(S)`,
                [id.snapshot.openPrice]:data[id.snapshot.openPrice],
                [id.snapshot.highPrice]:data[id.snapshot.highPrice],
                [id.snapshot.lowPrice]:data[id.snapshot.lowPrice],
                [id.snapshot.prevClosePrice]:data[id.snapshot.prevClosePrice],
                [id.snapshot.priceChange]:data[id.snapshot.priceChange],
                [id.snapshot.priceChangePercent]:data[id.snapshot.priceChangePercent],
            }
        }
        console.log(JSON.stringify(_value))
        
        this.script.setState({
            snapshot:_value
        })
    }

    lockLoadMore(){
        this.script.setState({
            loadmoreLock:true,
        })
    }
    unlockLoadMore(){
        this.script.setState({
            loadmoreLock:false,
        })
    }
   
    /**
     * This compares two sorted array and returns the index from where new values start
     */
    getNewValueIndex(oldList,newList){
        for(var i in newList){
            var lastTime=parseInt(oldList[oldList.length-1]._id)
            if(parseInt(newList[i]._id)>lastTime){
                oldList.push(newList[i])
            }
        }
        return oldList
    }
    getOldValueIndex(oldList,newList){
        newList.reverse()
        for(var i in newList){
            var lastTime=parseInt(oldList[0]._id)
            if(parseInt(newList[i]._id)<lastTime){
                oldList.unshift(newList[i])
            }
        }
        return oldList
    }

    getToolbar(){
        return this.interactor.getToolbar()
    }
    setToolbar(toolbar){
        this.interactor.setToolbar(toolbar)
    }

    saveLine(from,to,list){
        this.interactor.saveLine(from,to,list)
    }
    getLine(from,to){
        return this.interactor.getLine(from,to)
    }
    startLoading(){
        this.script.setState({
            isLoading:false,
        })
    }
    stopLoading(){
        this.script.setState({
            isLoading:false,
        })
    }
    exportTrendSet(trends,historyKey,datasetKey){
        this.interactor.exportTrendSet(trends,historyKey,datasetKey,(status,message)=>{
            alert(`status: ${status} message: ${JSON.stringify(message)}`)
        })
    }

    startExportLoading(){
        this.script.setState({
            exportLoading:true,
        })
    }
    stopExportLoading(){
        this.script.setState({
            exportLoading:false,
        })
    }
    getHistoryType(){
        const type=this.getToolbar().historyType[`${this.script.props.from}_${this.script.props.to}`]
        if(type===undefined|| type===null){
            return id.binance.candle_interval._1h
        }
        return type
    }

    getStartTimeHistory(endTime,count){
        return endTime-value.binance.candle_interval[`_${this.getHistoryType()}`]*count
    }
}

export default Presenter