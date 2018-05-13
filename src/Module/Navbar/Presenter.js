import Interactor from "./Interactor";
class Presenter{
    script
    interactor=new Interactor(this)
    constructor(script){
        this.script=script
    }

    getNavbar(){
        return this.interactor.getNavbarTab()
    }
}

export default Presenter