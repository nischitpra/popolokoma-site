import React from 'react'
import { macd } from "react-stockcharts/lib/indicator"
import { MACDSeries } from "react-stockcharts/lib/series"
import { Chart } from "react-stockcharts"
import { format } from "d3-format"
import { YAxis } from "react-stockcharts/lib/axes"
import { MouseCoordinateY } from "react-stockcharts/lib/coordinates"
import { MACDTooltip } from "react-stockcharts/lib/tooltip"
import Presenter from './Presenter'

const color =require("../../../../Values/Color").Color

const macdAppearance = {
	stroke: {
		macd: color.red,
		signal: color.green,
	},
	fill: {
		divergence: color.blue
	},
};
class MACD{
    formulaList=[]
    chartSize=100
    presenter=new Presenter(this)
    constructor(){
        this.init()   
    }
    init(){
        const value=this.presenter.getMACDToolbar()
        const _macd = macd()
        .options({
            fast: parseInt(value.fast),
            slow: parseInt(value.slow),
            signal: parseInt(value.signal),
        })
        .merge((d, c) => {d.macd = c})
        .accessor(d => d.macd)

        this.formulaList.push(_macd)
    }
    calculateData(data){
        for(var i=0;i<this.formulaList.length;i++){
            data=this.formulaList[i](data)
        }
        return data
    }
    render(y){
        return(<Chart id={y} yExtents={d => d.macd}
            height={this.chartSize}
            origin={(w, h) => [0, y]}>
                <YAxis axisAt="right" orient="right" ticks={3} tickFormat={format(".2s")}/>
                <MouseCoordinateY at="right" orient="right" displayFormat={format(".2s")} />
                <MACDSeries yAccessor={d => d.macd} {...macdAppearance}/>
                <MACDTooltip origin={[0, 0]} yAccessor={d => d.macd} displayFormat={format(".2s")} options={this.formulaList[0].options()} 
                appearance={macdAppearance}/>
            </Chart>                                
        )
    }
}

export default MACD