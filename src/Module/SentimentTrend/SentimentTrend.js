import React, {Component} from 'react'
import Presenter from './Presenter'
import Loading from '../Loading/Loading'
import { format } from "d3-format"
import { timeFormat } from "d3-time-format"
import { scaleTime } from "d3-scale"
import { utcSecond, utcMinute, utcHour, utcDay } from "d3-time"
import { ChartCanvas, Chart } from "react-stockcharts"
import { CandlestickSeries } from "react-stockcharts/lib/series"
import { XAxis, YAxis } from "react-stockcharts/lib/axes"
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils"
import { OHLCTooltip } from "react-stockcharts/lib/tooltip"
import { CrossHairCursor, EdgeIndicator, MouseCoordinateX, MouseCoordinateY,} from "react-stockcharts/lib/coordinates"
import {value} from "../../Values/Constants"
const color =require("../../Values/Color").Color

class SentimentTrend extends Component{
    constructor(props){
        super(props)
        this.state={
            sentimentData:[],
            isLoading:true,
        }
        this.presenter=new Presenter(this)
    }
    componentDidMount(){
        this.presenter.fetchSentimentTrend()
    }

    render(){
        var data=this.state.sentimentData
        if(data.length>0){
            var yExtent=[]
            yExtent.push(d => [d.high, d.low])
            const xAccessor = (d) => {
                return new Date(parseInt(d.time))
            }
            const xExtents = [ xAccessor(last(data)), xAccessor(data[data.length-96]) ]
            const height=this.props.chartWidth*value.chartHeightRatio
            const width=this.props.chartWidth
            return(
                <div className={'chart'}>
                    <ChartCanvas 
                        height={height}
                        width={width}
                        ratio={3}
                        margin={value.isMobile?{ left: 0, right: 0, top: 0, bottom: 0 }:{ left: 0, right: 0, top: 0, bottom: 0 }}
                        type={'hybrid'}
                        seriesName="MSFT"
                        data={data}
                        xAccessor={xAccessor}
                        xScale={scaleTime()}
                        displayXAccessor={xAccessor}
                        xExtents={xExtents}
                        zoomEvent={value.isMobile?false:true}
                        >
                        <Chart id={1} yExtents={yExtent} height={height-25} origin={(w, h) => [0, value.isMobile?25:0]}>
                        {/* <YAxis axisAt={value.isMobile?"left":"right"} orient={value.isMobile?"left":"right"} ticks={4} displayFormat={format(".0f")} /> */}
                        {/* <MouseCoordinateY at={value.isMobile?"left":"right"} orient={value.isMobile?"left":"right"} displayFormat={format(".0f")} /> */}
                        {/* <EdgeIndicator 
                                itemType="last" 
                                orient="right" 
                                edgeAt="right" 
                                yAccessor={d => d.close} 
                                displayFormat={format(".0f")}
                                fill={d => d.close > d.open ? color.green : color.red }/> */}
                            <CandlestickSeries width={timeIntervalBarWidth(utcHour)}
                                wickStroke={(d)=>d.close > d.open ? color.green : color.brightRed}
                                fill={(d)=>d.close > d.open ? color.green : color.brightRed}
                                stroke={(d)=>d.close > d.open ? color.green : color.brightRed}
                                candleStrokeWidth={1}
                                straightLineStroke= "#000000"
                                widthRatio={0.5}
                                opacity={1}
                                />
                            <OHLCTooltip origin={(w, h) => [0, value.isMobile?h-10:5]} ohlcFormat={format(".0f")} accessor= {d => {
                                const acc={date: parseInt(d.time), open: d.open,high: d.high,low: d.low,close: d.close,volume: (d.high-d.low) }
                                return acc}}
                                xDisplayFormat={value.isMobile?timeFormat("%_d.%m.%y %H:%M"):timeFormat("%_d %b %y, %I:%M %p")}
                                />
                            <XAxis axisAt={value.isMobile?"top":"bottom"} orient={value.isMobile?"top":"bottom"} ticks={4}/>
                            <MouseCoordinateX at={value.isMobile?"top":"bottom"} orient={value.isMobile?"top":"bottom"} displayFormat={timeFormat("%_d %b %y, %I:%M %p")} />
                        </Chart>
                        <CrossHairCursor />
                    </ChartCanvas>
                </div>
            )
        }
        return(<div><Loading data={data} isLoading={this.state.isLoading}/></div>)
    }
}


export default SentimentTrend
