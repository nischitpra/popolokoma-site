import Interactor from "./Interactor";
class Presenter{
    script
    interactor=new Interactor(this)
    constructor(script){
        this.script=script
    }
    fetchSentimentTrend(){
        this.interactor.fetchSentimentTrend()
    }

    loadSentiment(data){
        this.script.setState({
            sentimentData:data
        })
    }

    stopLoading(){
        this.script.setState({
            isLoading:false,
        })
    }
    
}

export default Presenter