import React, {Component} from 'react'
import Presenter from './Presenter'
import Loading from '../Loading/Loading'
import { format } from "d3-format"
import { timeFormat } from "d3-time-format"
import { scaleTime } from "d3-scale"
import { utcMinute, utcHour, utcDay } from "d3-time"
import { ChartCanvas, Chart, series } from "react-stockcharts";
import { CandlestickSeries, LineSeries, ScatterSeries, CircleMarker } from "react-stockcharts/lib/series"
import { XAxis, YAxis } from "react-stockcharts/lib/axes"
import { fitWidth } from "react-stockcharts/lib/helper"
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils"
import { OHLCTooltip } from "react-stockcharts/lib/tooltip"
import { CrossHairCursor, EdgeIndicator, MouseCoordinateX, MouseCoordinateY,} from "react-stockcharts/lib/coordinates"
import {string,id} from '../../Values/Constants'
const color =require("../../Values/Color").Color

class ForecastTrend extends Component{
    constructor(props){
        super(props)
        this.state={
            forecastData:[],
            isLoading:true,
        }
        this.presenter=new Presenter(this)
    }
    componentDidMount(){
        // this.presenter.fetchForecastTrend(this.props.from,this.props.to,this.props.type,this.props.exchange)
    }

    render(){
        var data=this.state.forecastData
        if(data.length>0){
            
            var str=(data[0][id.history.close]+"")
            var decimalPlaces=str.substring(str.indexOf('.'),str.length).length
            var extraSpace = 9-decimalPlaces
            if(decimalPlaces>9){
                decimalPlaces=decimalPlaces-extraSpace
            }


            var yExtent=[]
            yExtent.push(d => [d.high, d.low])
            const xAccessor = (d) => {
                return new Date(d.time*1000)
            }
            const xExtents = [ xAccessor(last(data)), xAccessor(data[0]) ]
            return(
                <div className={'sentiment-trend-container chart'}>
                    <div className='title-tag-independent' >{string.forecastTrend}</div>
                    <ChartCanvas 
                        height={350}
                        width={this.props.chartWidth}
                        ratio={3}
                        margin={{ left: 0, right: 105-extraSpace*3, top: 10, bottom: 30 }}
                        type={'hybrid'}
                        seriesName="MSFT"
                        data={data}
                        xAccessor={xAccessor}
                        xScale={scaleTime()}
                        displayXAccessor={xAccessor}
                        xExtents={xExtents}>

                       


                        <Chart id={1} yExtents={yExtent} height={300}>
                            <YAxis axisAt="right" orient="right" ticks={5} displayFormat={format(`.${decimalPlaces}f`)} />
                            <MouseCoordinateY at="right" orient="right" displayFormat={format(`.${decimalPlaces}f`)} />
                            <EdgeIndicator 
                                itemType="last" 
                                orient="right" 
                                edgeAt="right" 
                                yAccessor={d => d.close} 
                                displayFormat={format(`.${decimalPlaces}f`)}
                                fill={d => d.close > d.open ? color.green : color.red }/>

                            <LineSeries
                                yAccessor={d => d.open}
                                stroke="#1E88E5" />
                            <ScatterSeries
                                yAccessor={d => d.open}
                                marker={CircleMarker}
                                markerProps={{ width: 8, stroke: "#1E88E5", fill: "#1E88E5" }} />
                            <LineSeries
                                yAccessor={d => d.high}
                                stroke="#7CB342" />
                            <ScatterSeries
                                yAccessor={d => d.high}
                                marker={CircleMarker}
                                markerProps={{ width: 8, stroke: "#7CB342", fill: "#7CB342" }} />
                            <LineSeries
                                yAccessor={d => d.low}
                                stroke="#E53935" />
                            <ScatterSeries
                                yAccessor={d => d.low}
                                marker={CircleMarker}
                                markerProps={{ width: 8, stroke: "#E53935", fill: "#E53935" }} />
                            <LineSeries
                                yAccessor={d => d.close}
                                stroke="#6D4C41" />
                            <ScatterSeries
                                yAccessor={d => d.close}
                                marker={CircleMarker}
                                markerProps={{ width: 8, stroke: "#6D4C41", fill: "#6D4C41" }} />


                            {/* <CandlestickSeries width={timeIntervalBarWidth(utcDay)}/> */}
                            <OHLCTooltip origin={[0, -5]} ohlcFormat={format(".8f")} accessor= {d => {
                                const acc={date: d.time*1000, open: d.open,high: d.high,low: d.low,close: d.close,volume: (d.high-d.low) }
                                return acc}}
                                xDisplayFormat={timeFormat("%Y-%m-%d %H:%M")}
                                />
                        </Chart>
                        <Chart id={10} yExtents={d => [d.high, d.low]}>
                            <XAxis axisAt="bottom" orient="bottom"/>
                            <MouseCoordinateX at="bottom" orient="bottom" displayFormat={timeFormat("%d %b %y %H:%M")} />
                        </Chart>
                        <CrossHairCursor />
                    </ChartCanvas>
                </div>
            )
        }
        return(<div><Loading data={data} isLoading={this.state.isLoading}/></div>)
    }
}


export default ForecastTrend
