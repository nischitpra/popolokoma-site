import Prefs from '../../Prefs'
class Interactor{
    presenter
    constructor(presenter){
        this.presenter=presenter
    }
    getToolbar(){
        Prefs.getCandleStickToolbar()
    }
}

export default Interactor