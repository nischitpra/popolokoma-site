import Interactor from './Interactor'

class Presenter{
    constructor(script){
        this.script=script
        this.interactor=new Interactor(this)
    }
    getStrategyData(){
       this.interactor.getStrategyData()
    }
    setStrategyData(data){
        this.script.setState({
            strategyData:data
        })
    }
    getChartData(from,to,window){
        this.interactor.getChartData(from,to,window)
    }
    setChartData(data){
        var list=[]
        for(var i=data.length-1;i>=0;i--){
            list.push({
                time: data[i][0],
                open: data[i][1],
                close: data[i][2],
                high: data[i][3],
                low: data[i][4],
                volume: data[i][5],
            })
        }
        this.script.setState({
            chartData:list,
        })
    }

    setSelectedKey(name,from,to,window){
        this.script.setSelection(name,from,to,window)
    }
    startLoading(){
        this.script.setState({
            isLoading:true,
        })   
    }
    stopLoading(){
        this.script.setState({
            isLoading:false,
        })
    }

}
export default Presenter