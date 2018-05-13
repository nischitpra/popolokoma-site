import Prefs from "./Prefs"

class Interactor{
    presenter
    constructor(presenter){
        this.presenter=presenter
    }
    setNavbarTab(tab){
        Prefs.setNavbarTab(tab)
    }
    init(){
        if(Prefs.getNavbarTab()==null){
            Prefs.init()
        }
    }
}
export default Interactor