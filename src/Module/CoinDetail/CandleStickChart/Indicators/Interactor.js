import Prefs from "../../../../Prefs";


class Interactor{
    presenter
    constructor(presenter){
        this.presenter=presenter
    }
    getSubToolbar(){
        return Prefs.getSubToolbar()
    }
    setSMAToolbar(fast,medium,slow){
        Prefs.setSMAToolbar(fast,medium,slow)
    }
    getSMAToolbar(){
        return Prefs.getSMAToolbar()
    }
    setEMAToolbar(fast,medium,slow){
        Prefs.setEMAToolbar(fast,medium,slow)
    }
    getEMAToolbar(){
        return Prefs.getEMAToolbar()
    }
    setARTToolbar(atr){
        Prefs.setARTToolbar(atr)
    }
    getATRToolbar(){
        return Prefs.getATRToolbar()
    }
    setElderRayToolbar(elderRay){
        Prefs.setElderRayToolbar(elderRay)
    }
    getElderRayToolbar(){
        return Prefs.getElderRayToolbar()
    }
    setMACDToolbar(fast,slow,signal){
        Prefs.setMACDToolbar(fast,slow,signal)
    }
    getMACDToolbar(){
        return Prefs.getMACDToolbar()
    }
    setRSIToolbar(rsi){
        Prefs.setRSIToolbar(rsi)
    }
    getRSIToolbar(){
        return Prefs.getRSIToolbar()
    }
    setSTOToolbar(windowSize,kWindowSize,dWindowSize){
        Prefs.setSTOToolbar(windowSize,kWindowSize,dWindowSize)
    }
    getSTOToolbar(){
        return Prefs.getSTOToolbar()
    }
}

export default Interactor