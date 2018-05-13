import Interactor from "./Interactor";

class Presenter{
    script
    interactor=new Interactor(this)
    constructor(script){
        this.script=script
    }
    setToolbarOptions(toolbar){
        this.interactor.setToolbarOptions(toolbar)
    }
    getToolbarOptions(){
        return this.interactor.getToolbarOptions()
    }


    setSubToolbar(subToolbar){
        this.interactor.setSubToolbar(subToolbar)
        this.refreshPage()
    }
    getSubToolbar(){
        return this.interactor.getSubToolbar()
    }
    setSMAToolbar(fast,medium,slow){
        this.interactor.setSMAToolbar(fast,medium,slow)
        this.refreshPage()
    }
    getSMAToolbar(){
        return this.interactor.getSMAToolbar()
    }
    setEMAToolbar(fast,medium,slow){
        this.interactor.setEMAToolbar(fast,medium,slow)
        this.refreshPage()
    }
    getEMAToolbar(){
        return this.interactor.getEMAToolbar()
    }
    setATRToolbar(atr){
        this.interactor.setARTToolbar(atr)
        this.refreshPage()
    }
    getATRToolbar(){
        return this.interactor.getATRToolbar()
    }
    setElderRayToolbar(elderRay){
        this.interactor.setElderRayToolbar(elderRay)
        this.refreshPage()
    }
    getElderRayToolbar(){
        return this.interactor.getElderRayToolbar()
    }
    setMACDToolbar(fast,slow,signal){
        this.interactor.setMACDToolbar(fast,slow,signal)
        this.refreshPage()
    }
    getMACDToolbar(){
        return this.interactor.getMACDToolbar()
    }
    setRSIToolbar(rsi){
        this.interactor.setRSIToolbar(rsi)
        this.refreshPage()
    }
    getRSIToolbar(){
        return this.interactor.getRSIToolbar()
    }
    setSTOToolbar(windowSize,kWindowSize,dWindowSize){
        this.interactor.setSTOToolbar(windowSize,kWindowSize,dWindowSize)
        this.refreshPage()
    }
    getSTOToolbar(){
        return this.interactor.getSTOToolbar()
    }
    refreshPage(){
        this.script.props.refreshPage()
    }
    setSubToolbarOpen(value){
        this.interactor.setSubToolbarOpen(value)
    }
    getSubToolbarOpen(){
        return this.interactor.getSubToolbarOpen()
    }
    getIsSubscribed(email,from,to){
        this.interactor.getIsSubscribed(email,from,to)
    }
    setIsSubscribed(value){
        this.script.setState({
            isSubscribed:value,
        })
    }
    subscribe(email,from,to,callback){
        this.interactor.subscribe(email,from,to,callback)
    }
    unsubscribe(email,from,to){
        this.interactor.unsubscribe(email,from,to)
    }
    submitOTP(email,from,to,otp,callback){
        this.interactor.submitOTP(email,from,to,otp,callback)
    }

    setEmail(email){
        this.interactor.setEmail(email)
    }
    getEmail(){
        return this.interactor.getEmail()
    }

}

export default Presenter