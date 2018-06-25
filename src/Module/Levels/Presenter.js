import {string,id,value} from '../../Values/Constants'
import color from '../../Values/Color'
import Interactor from './Interactor'
class Presenter{
    constructor(script){
        this.script=script
        this.interactor=new Interactor(this)
    }
    getLevels(from,to){
        this.interactor.getLevels(from,to)
    }
    setLevels(data){
        var scaleTo=this.script.state.scaleTo
        scaleTo= scaleTo==undefined||scaleTo==null?1:scaleTo

        if(this.script!=undefined){
            if(data!=undefined && data.length>0){
                const list=[]
                for(var i in data){
                    list.push({
                        start: [data[i][id.time]-1, data[i][id.close]/scaleTo], 
                        end: [data[i][id.time]+1, data[i][id.close]/scaleTo], 
                        appearance: { stroke: data[i][id.type]==value.levels.resistance?color.darkRed:color.darkGreen, strokeWidth:1.5, strokeOpacity:0.75 }, 
                        type: "XLINE" 
                    })
                }
                console.log(JSON.stringify(list))
                this.script.setState({
                    levels:list,
                })
            }
        }
    }
}
export default Presenter