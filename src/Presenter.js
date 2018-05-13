import Interactor from './Interactor'
class Presenter{
    script
    interactor=new Interactor(this)
    constructor(script){
        this.script=script
    }

    setNavbarTab(tab){
        this.interactor.setNavbarTab(tab)
    }
    init(){
        this.interactor.init()
    }
}
export default Presenter