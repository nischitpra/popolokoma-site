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
    getFavouritesList(){
        return this.interactor.getFavouritesList()
    }

    getSnapshot(from,to){
        this.interactor.getSnapshot(from,to)
    }   
    setSnapshot(data){
        this.script.setState({
            snapshot:data,
        })
    } 
    
}

export default Presenter