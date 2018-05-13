import Prefs from "../../Prefs";

class Interactor {
    presenter
    constructor(presenter){
        this.presenter=presenter
    }
    setNavbarTab(tab){
        Prefs.setNavbarTab(tab)    
    }
    getNavbarTab(){
        return Prefs.getNavbarTab()
    }
}

export default Interactor