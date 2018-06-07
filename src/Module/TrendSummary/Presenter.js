import Interactor from './Interactor'
import {string,id} from '../../Values/Constants'
import { timeFormat } from "d3-time-format" 

class Presenter{
    interactor=new Interactor(this)
    constructor(script){
        this.script=script
        this.format=timeFormat("%_d %b, %_I:%M %p")
    }
    getTrendData(from,to){
        this.interactor.getTrend(from,to)
    }
    setTrendData(data){
        var max=0
        for(var i=0; i<data[id.trendSummary.volatility].length; i++){
            if(data[id.trendSummary.volatility][i][id.trendSummary.volatility]<0){
                data[id.trendSummary.volatility].splice(i, 1)
                i=i-1
                continue
            }
            if(max<parseFloat(data[id.trendSummary.volatility][i][id.trendSummary.volatility])){
                max=parseFloat(data[id.trendSummary.volatility][i][id.trendSummary.volatility])
            }
        }
        var min=1
        for(var i in data[id.trendSummary.volatility]){
            data[id.trendSummary.volatility][i][id.trendSummary.volatility]=data[id.trendSummary.volatility][i][id.trendSummary.volatility]/max
            if(parseFloat(min)>parseFloat(data[id.trendSummary.volatility][i][id.trendSummary.volatility])){
                min=data[id.trendSummary.volatility][i][id.trendSummary.volatility]
            }
        }
        if(this.script!=undefined){
            this.script.setState({
                trend:data[id.trendSummary.trend],
                volatility:data[id.trendSummary.volatility],
                min_vola:min,
                max_vola:1,
            })
        }
    }
    setPriceData(data){
        var max=0
        for(var i in data){
            if(max<parseFloat(data[i][id.high])){
                max=parseFloat(data[i][id.high])
            }
        }
        var min=1
        for(var i in data){
            data[i][id.open]=data[i][id.open]/max
            data[i][id.high]=data[i][id.high]/max
            data[i][id.low]=data[i][id.low]/max
            data[i][id.close]=data[i][id.close]/max
            
            if(parseFloat(min)>parseFloat(data[i][id.low])){
                min=data[i][id.low]
            }
        }
        if(this.script!=undefined){
            this.script.setState({
                data:data,
                min:min,
                max:1,
            })
        }
    }
    startLoading(){
        if(this.script!=undefined){
            this.script.setState({
                isLoading:true,
            })
        }
    }
    stopLoading(){
        if(this.script!=undefined){
            this.script.setState({
                isLoading:false,
            })
        }
    }
}
export default Presenter