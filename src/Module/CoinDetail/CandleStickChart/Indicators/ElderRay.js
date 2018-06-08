import React from 'react'
import { change, elderRay } from "react-stockcharts/lib/indicator"
import { ElderRaySeries } from "react-stockcharts/lib/series"
import { Chart } from "react-stockcharts"
import { format } from "d3-format"
import { YAxis } from "react-stockcharts/lib/axes"
import { MouseCoordinateY } from "react-stockcharts/lib/coordinates"
import { SingleValueTooltip } from "react-stockcharts/lib/tooltip"
import Presenter from './Presenter'
import { value } from '../../../../Values/Constants';

class ElderRay{
    formulaList=[]
    chartSize=100
    presenter=new Presenter(this)
    constructor(){
        this.init()   
    }
    init(){
        const value=this.presenter.getElderRayToolbar()
        const _er = elderRay()
        .options({ windowSize: parseInt(value) })
        .merge((d, c) => {d.er = c})
        .accessor(d => d.er)
        
        const changeCalculator = change()
        
        this.formulaList.push(_er)
        this.formulaList.push(changeCalculator)
    }
    calculateData(data){
        for(var i=0;i<this.formulaList.length;i++){
            data=this.formulaList[i](data)
        }
        return data
    }
    render(y){
        return(<Chart id={y} yExtents={d => d.er}
            height={this.chartSize}
            origin={(w, h) => [0, y]}
            >
                {!value.isMobile?<YAxis axisAt="right" orient="right" ticks={3} tickFormat={format(".2s")}/>:''}
                {!value.isMobile?<MouseCoordinateY at="right" orient="right" displayFormat={format(".2s")} />:''}
                <ElderRaySeries yAccessor={d => d.er} />
                <SingleValueTooltip origin={[0, 0]} yAccessor={d => d.er} yLabel={`Elder Ray (${this.formulaList[0].options().windowSize}) (Bull, Bear)`} 
                yDisplayFormat={d => `${format(".2s")(d.bullPower)}, ${format(".2s")(d.bearPower)}`} />
            </Chart>                                
        )
    }
}

export default ElderRay