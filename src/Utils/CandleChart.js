import React, {Component} from 'react'
import { timeFormat } from "d3-time-format"
import { format } from "d3-format"
import { scaleTime } from "d3-scale"
import { interval, durationMinute, durationSecond, durationHour, durationDay, utcMinute, utcHour, utcDay } from "d3-time"
import { ChartCanvas, Chart } from "react-stockcharts"
import { CandlestickSeries } from "react-stockcharts/lib/series"
import { XAxis, YAxis } from "react-stockcharts/lib/axes"
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils"
import { OHLCTooltip } from "react-stockcharts/lib/tooltip"
import { CrossHairCursor, EdgeIndicator, MouseCoordinateX, MouseCoordinateY,} from "react-stockcharts/lib/coordinates"
import { id, string, value} from "../Values/Constants"
const color =require("../Values/Color").Color


class CandleChart extends Component{

    constructor(props){
        super(props)
        this.state={
            width:300,
        }

        this.setWidth=this.setWidth.bind(this)
    }
    setWidth(){
        this.setState({
            width:this.chartContaner.clientWidth,
        })
    }
    componentDidMount(){
        this.setWidth()
        window.addEventListener("resize", ()=>{
            this.setWidth()
        });
    }
    componentWillUnmount(){
        window.removeEventListener("resize",()=>{
            this.setWidth()            
        });
    }
    downloadMoreHistory(){
        // download more history on panning
    }
    render(){
        var data=this.props.data

        var yExtent=[]
        yExtent.push(d => [d.high, d.low])
        const xAccessor = (d) => {
            if(d!=undefined)return new Date(parseInt(d.time)) 
            else
            return new Date() 
        }
            
        const xExtents = [ xAccessor(last(data)), xAccessor(data[data.length-data.length*0.7]) ]
        
        // var timeRange= this.props.windowFrame===id.binance.candle_interval._1m?utcMinute:this.props.windowFrame===id.binance.candle_interval._1h?utcHour:utcDay
        var digit = parseInt( this.props.windowFrame.substring( 0, this.props.windowFrame.length - 1 ) )
        var timeRange = this.props.windowFrame.includes("m")?utcMinute.every( digit ):this.props.windowFrame.includes("h")?utcHour.every( digit ):utcDay.every( digit )

        return(
            <div className={this.props.className} ref={container=>this.chartContaner=container} onClick={this.props.onClick}> 
                <ChartCanvas 
                    height={250}
                    width={this.state.width}
                    ratio={3}
                    margin={{ left: 0, right: 70, top: 10, bottom: 30 }}
                    type={'hybrid'}
                    seriesName="MSFT"
                    data={data}
                    xAccessor={xAccessor}
                    xExtents={xExtents}
                    xScale={scaleTime()}
                    displayXAccessor={xAccessor}
                    xExtents={xExtents}
                    onLoadMore={this.downloadMoreHistory}
                    zoomEvent={this.props.zoom}
                    panEvent={this.props.pan}
                    clamp={false}
                    >           
                    <Chart id={10} yExtents={d => [parseFloat(d.high), parseFloat(d.low)]}>
                        <CandlestickSeries width={timeIntervalBarWidth(timeRange)}
                            wickStroke={(d)=>d.close > d.open ? color.green : color.brightRed}
                            fill={(d)=>d.close > d.open ? color.green : color.brightRed}
                            stroke={(d)=>d.close > d.open ? color.green : color.brightRed}
                            candleStrokeWidth={1}
                            straightLineStroke= "#000000"
                            widthRatio={0.5}
                            opacity={1}
                            />
                        <YAxis axisAt={value.isMobile?"left":"right"} orient={value.isMobile?"left":"right"} ticks={4} displayFormat={format(".2f")} />
                        <XAxis axisAt={value.isMobile?"top":"bottom"} orient={value.isMobile?"top":"bottom"}/>
                    </Chart>
                </ChartCanvas>
            </div>
        )
    }
}

export default CandleChart;