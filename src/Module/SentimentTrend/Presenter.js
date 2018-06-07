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
        if(this.script!=undefined){
            this.script.setState({
                sentimentData:data
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