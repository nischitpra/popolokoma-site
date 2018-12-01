import Interactor from './Interactor'

class Presenter{
    constructor(script){
        this.script=script
        this.interactor=new Interactor(this)
    }
    setStrategyData(data){
        this.script.strategyData = data
    }
    setChartData(data, showWindow){
        var list=[]
        for(var i=0;i<data.length;i++){
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
            showWindow:showWindow
        })
    }

    setSelectedKey( name, from, to, window, pairData ){
        this.script.setSelection( name, from, to, window, pairData )
        this.stopLoading()
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