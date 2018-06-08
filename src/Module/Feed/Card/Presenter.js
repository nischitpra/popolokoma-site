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
        if(this.script!=undefined)
        this.script.setState({
            sentimentData:data
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
    getFavouritesList(){
        return this.interactor.getFavouritesList()
    }
    setFavouritesList(list){
        this.interactor.setFavouritesList(list)
    }

    getSnapshot(from,to){
        this.interactor.getSnapshot(from,to)
    }   
    setSnapshot(data){
        if(this.script!=undefined)
        this.script.setState({
            snapshot:data,
        })
    } 
    
}

export default Presenter