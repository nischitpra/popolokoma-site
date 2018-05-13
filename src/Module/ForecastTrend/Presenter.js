import Interactor from "./Interactor";
class Presenter{
    script
    interactor=new Interactor(this)
    constructor(script){
        this.script=script
    }
    fetchForecastTrend(from,to,type,exchange){
        // this.interactor.fetchForecastTrend(from,to,type)
        this.interactor.getForecastHistory(from,to,type,exchange)
    }

    loadForecast(data){
        this.script.setState({
            forecastData:data
        })
    }

    stopLoading(){
        this.script.setState({
            isLoading:false,
        })
    }
    
}

export default Presenter