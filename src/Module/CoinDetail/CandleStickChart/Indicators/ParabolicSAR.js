import React from 'react'
import { sar } from "react-stockcharts/lib/indicator"
import { SARSeries } from "react-stockcharts/lib/series"
const color = require("../../../../Values/Color").Color

const accelerationFactor = .02;
const maxAccelerationFactor = .2;

const fill={
    falling: color.red,
    rising: color.green
}

class ParabolicSAR{
    formulaList=[]
    renderList=[]
    accessorList=[]
    chartSize=150
    constructor(){
        this.init()   
    }
    init(){
        const _sar = sar()
        .options({accelerationFactor, maxAccelerationFactor})
        .merge((d, c) => {d.sar = c})
        .accessor(d => d.sar)

        this.formulaList.push(_sar)
        this.accessorList.push(_sar.accessor())
        this.renderList.push(<SARSeries yAccessor={d => d.sar} fill={fill}/>)
    }
    calculateData(data){
        for(var i=0;i<this.formulaList.length;i++){
            data=this.formulaList[i](data)
        }
        return data
    }
}

export default ParabolicSAR