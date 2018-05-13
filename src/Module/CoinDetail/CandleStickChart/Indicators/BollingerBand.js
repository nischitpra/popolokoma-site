import React from 'react'
import { bollingerBand } from "react-stockcharts/lib/indicator"
import { BollingerSeries } from "react-stockcharts/lib/series"
const color = require("../../../../Values/Color").Color

const bbStroke = {
	top: color.bollingerBandEdge,
	middle: color.blue,
	bottom: color.bollingerBandEdge,
}
const bbFill = color.veryLightBlue

class BollingerBand{
    formulaList=[]
    renderList=[]
    accessorList=[]
    chartSize=150
    constructor(){
        this.init()   
    }
    init(){
        const _bb = bollingerBand()
        .merge((d, c) => {d.bb = c})
        .accessor(d => d.bb)

        this.formulaList.push(_bb)
        this.accessorList.push(_bb.accessor())
        this.renderList.push(<BollingerSeries yAccessor={d => d.bb} fill={bbFill} stroke={bbStroke}/>)
    }
    calculateData(data){
        for(var i=0;i<this.formulaList.length;i++){
            data=this.formulaList[i](data)
        }
        return data
    }
}

export default BollingerBand