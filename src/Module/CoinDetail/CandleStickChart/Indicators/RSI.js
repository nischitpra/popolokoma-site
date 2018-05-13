import React from 'react'
import { rsi } from "react-stockcharts/lib/indicator"
import { RSISeries } from "react-stockcharts/lib/series"
import { Chart } from "react-stockcharts"
import { format } from "d3-format"
import { YAxis } from "react-stockcharts/lib/axes"
import { MouseCoordinateY } from "react-stockcharts/lib/coordinates"
import { RSITooltip } from "react-stockcharts/lib/tooltip"
import Presenter from './Presenter'

class RSI{
    formulaList=[]
    chartSize=100
    presenter=new Presenter(this)
    constructor(){
        this.init()   
    }
    init(){
        const value=this.presenter.getRSIToolbar()
        const _rsi = rsi()
        .options({ windowSize: parseInt(value) })
        .merge((d, c) => {d.rsi = c})
        .accessor(d => d.rsi)

        this.formulaList.push(_rsi)
    }
    calculateData(data){
        for(var i=0;i<this.formulaList.length;i++){
            data=this.formulaList[i](data)
        }
        return data
    }
    render(y){
        return(<Chart id={y} yExtents={d => d.rsi}
            height={this.chartSize}
            origin={(w, h) => [0, y]}>
                <YAxis axisAt="right" orient="right" ticks={3} tickFormat={format(".2s")}/>
                <MouseCoordinateY at="right" orient="right" displayFormat={format(".2s")} />
                <RSISeries yAccessor={d => d.rsi}/>
                <RSITooltip origin={[0, 0]} yAccessor={d => d.rsi} options={this.formulaList[0].options()} />
            </Chart>                                
        )
    }
}

export default RSI