import Interactor from './Interactor'

class Presenter{
    constructor(script){
        this.script=script
        this.interactor=new Interactor(this)
    }
    getNews(type,count,page){
        this.interactor.getNews(type,count,page)
    }
    setNews(newsList){
        if(this.script!=undefined){
            this.script.setState({
                newsList:newsList,
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