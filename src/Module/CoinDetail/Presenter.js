import Interactor from './Interactor';

class Presenter {
    interactor=new Interactor(this)
    script
    constructor(script){
        this.script=script
    }
    getToolbar(){
        return this.interactor.getToolbar()
    }
}

export default Presenter