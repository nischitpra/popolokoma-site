import React from 'react'
import { ema } from "react-stockcharts/lib/indicator"
import { LineSeries } from "react-stockcharts/lib/series"
import { CurrentCoordinate } from "react-stockcharts/lib/coordinates"
import { MovingAverageTooltip } from "react-stockcharts/lib/tooltip"
import { format } from "d3-format"
import Presenter from './Presenter'

const color =require("../../../../Values/Color").Color

class EMA{
    formulaList=[]
    accessorList=[]
    renderList=[]
    presenter=new Presenter(this)
    constructor(){
        this.init()   
    }
    init(){
        const value=this.presenter.getEMAToolbar()
        const ema1 = ema()
        .id(0)
        .options({ windowSize: parseInt(value.fast) })
        .merge((d, c) => { d.ema1 = c })
        .accessor(d => d.ema1)
        .stroke(color.red)

        const ema2 = ema()
        .id(0)
        .options({ windowSize: parseInt(value.medium) })
        .merge((d, c) => { d.ema2 = c })
        .accessor(d => d.ema2)
        .stroke(color.green)

        const ema3 = ema()
        .id(0)
        .options({ windowSize: parseInt(value.slow) })
        .merge((d, c) => { d.ema3 = c })
        .accessor(d => d.ema3)
        .stroke(color.blue)

        this.accessorList.push(ema1.accessor())
        this.accessorList.push(ema2.accessor())
        this.accessorList.push(ema3.accessor())

        this.formulaList.push(ema1)
        this.formulaList.push(ema2)
        this.formulaList.push(ema3)

        this.renderList=([
            <MovingAverageTooltip origin={[0, 5]} displayFormat={format("0.8f")}
                options={[
                    {
                        yAccessor: this.accessorList[0],
                        type: "EMA",
                        stroke: this.formulaList[0].stroke(),
                        windowSize: this.formulaList[0].options().windowSize,
                    },
                    {
                        yAccessor: this.accessorList[1],
                        type: "EMA",
                        stroke: this.formulaList[1].stroke(),
                        windowSize: this.formulaList[1].options().windowSize,
                    },
                    {
                        yAccessor: this.accessorList[2],
                        type: "EMA",
                        stroke: this.formulaList[2].stroke(),
                        windowSize: this.formulaList[2].options().windowSize,
                    },
                ]}/>,
                <LineSeries yAccessor={this.formulaList[0].accessor()} stroke={this.formulaList[0].stroke()}/>,
                <LineSeries yAccessor={this.formulaList[1].accessor()} stroke={this.formulaList[1].stroke()}/>,
                <LineSeries yAccessor={this.formulaList[2].accessor()} stroke={this.formulaList[2].stroke()}/>,
                <CurrentCoordinate yAccessor={this.formulaList[0].accessor()} fill={this.formulaList[0].stroke()} />,
                <CurrentCoordinate yAccessor={this.formulaList[1].accessor()} fill={this.formulaList[1].stroke()} />,
                <CurrentCoordinate yAccessor={this.formulaList[2].accessor()} fill={this.formulaList[2].stroke()} />,
                ])
    }
    calculateData(data){
        for(var i=0;i<this.formulaList.length;i++){
            data=this.formulaList[i](data)
        }
        return data
    }
}

export default EMA
