import Interactor from './Interactor'
class Presenter{
    script
    interactor=new Interactor(this)
    constructor(script){
        this.script=script
    }

    setSMAToolbar(fast,medium,slow){
        this.interactor.setSMAToolbar(fast,medium,slow)
    }
    getSMAToolbar(){
        return this.interactor.getSMAToolbar()
    }
    setEMAToolbar(fast,medium,slow){
        this.interactor.setEMAToolbar(fast,medium,slow)
    }
    getEMAToolbar(){
        return this.interactor.getEMAToolbar()
    }
    setARTToolbar(atr){
        this.interactor.setARTToolbar(atr)
    }
    getATRToolbar(){
        return this.interactor.getATRToolbar()
    }
    setElderRayToolbar(elderRay){
        this.interactor.setElderRayToolbar(elderRay)
    }
    getElderRayToolbar(){
        return this.interactor.getElderRayToolbar()
    }
    setMACDToolbar(fast,slow,signal){
        this.interactor.setMACDToolbar(fast,slow,signal)
    }
    getMACDToolbar(){
        return this.interactor.getMACDToolbar()
    }
    setRSIToolbar(rsi){
        this.interactor.setRSIToolbar(rsi)
    }
    getRSIToolbar(){
        return this.interactor.getRSIToolbar()
    }
    setSTOToolbar(windowSize,kWindowSize,dWindowSize){
        this.interactor.setSTOToolbar(windowSize,kWindowSize,dWindowSize)
    }
    getSTOToolbar(){
        return this.interactor.getSTOToolbar()
    }

}
export default Presenter