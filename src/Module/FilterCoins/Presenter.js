import React from 'react'
import Interactor from "./Interactor"
import {utilities} from '../../Utilities'
import {string,value,id} from "../../Values/Constants"

class Presenter{
    script
    interactor=new Interactor(this)
    constructor(script){
        this.script=script
    }
    getStopLossLevels(){
        this.interactor.getStopLossLevels()
    }
    setStopLossLevels(data){
        for(var i in data){
            const pair=utilities.getPairFromKey(data[i][id.db.column.key])
            data[i][id.db.column.from]=pair[0]
            data[i][id.db.column.to]=pair[1]
        }
        if(this.script!=undefined && data!=undefined && data.length>0){
            this.script.setState({
                stopLossLevel:data
            })
        }
    }



    startLoading(){
        if(this.script!=undefined)
        this.script.setState({
            isLoading:true,
        })
    }
    stopLoading(){
        if(this.script!=undefined)
        this.script.setState({
            isLoading:false,
        })
    }


}

export default Presenter