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
        this.script.setState({
            newsList:newsList,
        })
        console.log('home news set')
    }
    stopLoading(){
        this.script.setState({
            isLoading:false,
        })
    }
}

export default Presenter