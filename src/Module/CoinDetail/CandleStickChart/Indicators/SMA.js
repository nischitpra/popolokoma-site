import React from 'react'
import { sma } from "react-stockcharts/lib/indicator"
import { LineSeries } from "react-stockcharts/lib/series"
import { CurrentCoordinate } from "react-stockcharts/lib/coordinates"
import { MovingAverageTooltip } from "react-stockcharts/lib/tooltip"
import { format } from "d3-format"
import Presenter from './Presenter'

const color =require("../../../../Values/Color").Color

class SMA{
    formulaList=[]
    accessorList=[]
    renderList=[]
    presenter=new Presenter(this)
    constructor(){
        this.init()   
    }
    init(){
        const value= this.presenter.getSMAToolbar()
        const sma13 = sma()
        .id(0)
        .options({ windowSize: parseInt(value.fast) })
        .merge((d, c) => { d.sma13 = c })
        .accessor(d => d.sma13)
        .stroke(color.red)

        const sma22 = sma()
        .id(0)
        .options({ windowSize: parseInt(value.medium) })
        .merge((d, c) => { d.sma22 = c })
        .accessor(d => d.sma22)
        .stroke(color.green)

        const sma40 = sma()
        .id(0)
        .options({ windowSize: parseInt(value.slow) })
        .merge((d, c) => { d.sma40 = c })
        .accessor(d => d.sma40)
        .stroke(color.blue)

        this.accessorList.push(sma13.accessor())
        this.accessorList.push(sma22.accessor())
        this.accessorList.push(sma40.accessor())

        this.formulaList.push(sma13)
        this.formulaList.push(sma22)
        this.formulaList.push(sma40)

        this.renderList=([
            <MovingAverageTooltip origin={[0, 5]} displayFormat={format("0.8f")}
                options={[
                    {
                        yAccessor: this.accessorList[0],
                        type: "SMA",
                        stroke: this.formulaList[0].stroke(),
                        windowSize: this.formulaList[0].options().windowSize,
                    },
                    {
                        yAccessor: this.accessorList[1],
                        type: "SMA",
                        stroke: this.formulaList[1].stroke(),
                        windowSize: this.formulaList[1].options().windowSize,
                    },
                    {
                        yAccessor: this.accessorList[2],
                        type: "SMA",
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

export default SMA
