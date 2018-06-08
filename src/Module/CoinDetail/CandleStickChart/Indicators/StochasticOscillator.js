import React from 'react'
import { stochasticOscillator } from "react-stockcharts/lib/indicator"
import { StochasticSeries } from "react-stockcharts/lib/series"
import { Chart } from "react-stockcharts"
import { format } from "d3-format"
import { YAxis } from "react-stockcharts/lib/axes"
import { MouseCoordinateY } from "react-stockcharts/lib/coordinates"
import { StochasticTooltip } from "react-stockcharts/lib/tooltip"
import Presenter from './Presenter'
import { value } from '../../../../Values/Constants';

const stoAppearance = {
	stroke: Object.assign({},
		StochasticSeries.defaultProps.stroke)
}


class StochasticOscillator{
    formulaList=[]
    chartSize=100
    presenter=new Presenter(this)
    constructor(){
        this.init()   
    }
    init(){
        const value=this.presenter.getSTOToolbar()
        const _sto  = stochasticOscillator()
        .options({ windowSize: parseInt(value.windowSize), kWindowSize: parseInt(value.kWindowSize), dWindowSize: parseInt(value.dWindowSize) })
        .merge((d, c) => {d.sto = c})
        .accessor(d => d.sto)

        this.formulaList.push(_sto)
    }
    calculateData(data){
        for(var i=0;i<this.formulaList.length;i++){
            data=this.formulaList[i](data)
        }
        return data
    }
    render(y){
        return(<Chart id={y} yExtents={d => d.sto}
            height={this.chartSize}
            origin={(w, h) => [0, y]}>
                {!value.isMobile?<YAxis axisAt="right" orient="right" ticks={3} tickFormat={format(".2s")}/>:''}
                {!value.isMobile?<MouseCoordinateY at="right" orient="right" displayFormat={format(".2s")} />:''}
                <StochasticSeries yAccessor={d => d.sto} {...stoAppearance}/>
                <StochasticTooltip origin={[0, 0]} yAccessor={d => d.sto} options={this.formulaList[0].options()} appearance={stoAppearance} label="STO" />
            </Chart>                                
        )
    }
}

export default StochasticOscillator