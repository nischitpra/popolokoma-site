import Interactor from './Interactor'
import {string,id} from '../../Values/Constants'
import { timeFormat } from "d3-time-format" 

class Presenter{
    interactor=new Interactor(this)
    constructor(script){
        this.script=script
        this.format=timeFormat("%_I:%M %p")
    }
    getTrendData(_id){
        switch(_id){
            case id.trend.all:
                this.interactor.getTrend(1)
                this.interactor.getTrend(0)
                this.interactor.getTrend(-1)
                break
            case id.trend.rise:
                this.interactor.getTrend(1)
                break
            case id.trend.fall:
                this.interactor.getTrend(-1)
                break
            case id.trend.consolidate:
                this.interactor.getTrend(0)
                break
        }
    }
    setTrendData(data){
        for(var i in data){
            const arr=data[i]['_key'].split("_")
            data[i]['from']=arr[0]
            data[i]['to']=arr[1]
            data[i]['confidence']=data[i]['confidence'].toFixed(2)
            data[i]['start_time']=this.format(new Date(parseInt(data[i]['start_time'])))
            data[i]['end_time']=this.format(new Date(parseInt(data[i]['end_time'])))
            data[i]['velocity']=data[i]['velocity']
        }
        
        if(this.script!=undefined)
        this.script.setState({
            data:this.script.state.data.concat(data)
        })
    }
    startLoading(){
        if(this.script!=undefined)
        this.script.setState({
            isLoading:true,
        })
    }
    stopLoading(){
        if(this.script!=undefined)
        this.script.setState({
            isLoading:false,
        })
    }
}
export default Presenter