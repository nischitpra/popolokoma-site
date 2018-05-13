import React from 'react'
import { atr } from "react-stockcharts/lib/indicator"
import { LineSeries } from "react-stockcharts/lib/series"
import { Chart } from "react-stockcharts"
import { format } from "d3-format"
import { YAxis } from "react-stockcharts/lib/axes"
import { MouseCoordinateY } from "react-stockcharts/lib/coordinates"
import { SingleValueTooltip } from "react-stockcharts/lib/tooltip"
import Presenter from './Presenter'

class ATR{
    formulaList=[]
    chartSize=100
    presenter=new Presenter(this)
    constructor(){
        this.init()   
    }
    init(){
        const value=this.presenter.getATRToolbar()
        const _atr = atr()
        .options({ windowSize: parseInt(value)})
        .merge((d, c) => {d.atr = c})
        .accessor(d => d.atr)
       
        this.formulaList.push(_atr)
    }
    calculateData(data){
        for(var i=0;i<this.formulaList.length;i++){
            data=this.formulaList[i](data)
        }
        return data
    }
    render(y){
        return(<Chart id={y} yExtents={d => d.atr}
            height={this.chartSize}
            origin={(w, h) => [0, y]}>
                <YAxis axisAt="right" orient="right" ticks={3} tickFormat={format(".2s")}/>
                <MouseCoordinateY at="right" orient="right" displayFormat={format(".2s")} />
                <LineSeries yAccessor={d => d.atr} />
                <SingleValueTooltip origin={[0, 0]} yAccessor={d => d.atr} yLabel={`ATR (${this.formulaList[0].options().windowSize})`} yDisplayFormat={format(".2s")}/>
            </Chart>                                
        )
    }
}

export default ATR