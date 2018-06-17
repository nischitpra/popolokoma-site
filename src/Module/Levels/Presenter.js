import {string,id} from '../../Values/Constants'
import Interactor from '../Feed/Card/Interactor';
class Presenter{
    constructor(script){
        this.script=script
        this.interactor=new Interactor(this)
    }
    init(){
       
    }
    getTrendChangePoints(){
        this.interactor.getTrendChangePoints()
    }
}
export default Presenter