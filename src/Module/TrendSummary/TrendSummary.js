import React, { Component } from 'react'
import {id,string, value} from '../../Values/Constants'
import Presenter from './Presenter';
import Loading from '../Loading/Loading';
import matchSorter from 'match-sorter'
import { TrendLine } from "react-stockcharts/lib/interactive"
import { format } from "d3-format"
import { timeFormat } from "d3-time-format"
import { scaleTime } from "d3-scale"
import { utcSecond, utcMinute, utcHour, utcDay } from "d3-time"
import { ChartCanvas, Chart } from "react-stockcharts"
import { XAxis, YAxis } from "react-stockcharts/lib/axes"
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils"
import { OHLCTooltip } from "react-stockcharts/lib/tooltip"
import { CrossHairCursor, EdgeIndicator, MouseCoordinateX, MouseCoordinateY,} from "react-stockcharts/lib/coordinates"
import { AreaSeries, CircleMarker, LineSeries } from "react-stockcharts/lib/series";


const color =require("../../Values/Color").Color

class TrendSummary extends Component{
    presenter=new Presenter(this)
    constructor(props){
        super(props)
        this.state={
            isLoading:true,
            data:[],
            trend:[],
            volatility:[],
            max:1,
            min:0,
            max_vola:1,
            min_vola:0,
        }
    }
  
  componentDidMount(){
      this.presenter.getTrendData(this.props.from,this.props.to)
  }
  bound(value){
      return ((this.state.max-this.state.min)/(this.state.max_vola-this.state.min_vola))*(value-this.state.min_vola)+this.state.min
  }

  render() {
    const trend=this.state.trend
    const vola=this.state.volatility
    const data=this.state.data
    if(data.length==0 || trend.length==0 || vola.length==0){
        return (<Loading isLoading={this.state.isLoading}/>)
    }

    const xAccessor = (d) => { return new Date(parseInt(d[id.binance.id])) }
    const xExtents = [ xAccessor(last(data)), xAccessor(data[data.length-20]) ]
    
    var trendList=[]
    for(var i in trend){
        trendList.push({
            start: [trend[i][id.trendSummary.startTime], (this.state.min+this.state.max)/2], 
            end: [trend[i][id.trendSummary.endTime], (this.state.min+this.state.max)/2], 
            appearance: { stroke: trend[i][id.trendSummary.trend]>0 ? color.green : trend[i][id.trendSummary.trend]<0 ? color.red : color.yellow, strokeWidth:350, strokeOpacity:0.15 }, 
            type: "LINE" 
        })
    }
    var volatilityList=[
        {
            start: [vola[0][id.trendSummary.startTime], this.bound(vola[0][id.trendSummary.volatility]) ], 
            end: [vola[0][id.trendSummary.endTime],  this.bound(vola[0][id.trendSummary.volatility]) ], 
            appearance: { stroke: color.blue, strokeWidth:2, strokeOpacity:1.0 }, 
            type: "LINE" 
        }
    ]
    for(var i=1; i < vola.length; i++){
        volatilityList.push({
            start: [vola[i][id.trendSummary.startTime], this.bound(vola[i-1][id.trendSummary.volatility]) ], 
            end: [vola[i][id.trendSummary.endTime],  this.bound(vola[i][id.trendSummary.volatility]) ], 
            appearance: { stroke: color.blue, strokeWidth:2, strokeOpacity:1.0 }, 
            type: "LINE" 
        })
    }

    const height=this.props.chartWidth*value.chartHeightRatio
    const width=this.props.chartWidth
    return (
        <div className={'chart'}>
            <ChartCanvas 
                height={height}
                width={width}
                ratio={3}
                margin={{ left: 0, right: 45, top: 0, bottom: 30 }}
                type={'hybrid'}
                seriesName="MSFT"
                data={data}
                xAccessor={xAccessor}
                xScale={scaleTime()}
                displayXAccessor={xAccessor}
                xExtents={xExtents}
                panEvent={true}
                zoomEvent={true}
                >
                <Chart id={1} yExtents={d => [this.state.min,this.state.max]} height={height-50}>
                    <YAxis axisAt="right" orient="right" ticks={5} displayFormat={format(".2f")} />
                    <MouseCoordinateY at="right" orient="right" displayFormat={format(".2f")} />
                    <TrendLine
                        enabled={true}
                        onStart={() => console.log("START")}
                        snap={false}
                        enabled={false}
                        trends={trendList}
                        />
                    <TrendLine
                        enabled={true}
                        onStart={() => console.log("START")}
                        snap={false}
                        enabled={false}
                        trends={volatilityList}
                        />
                    <LineSeries yAccessor={d => d[id.high]} stroke={color.darkGreen} />
                    <LineSeries yAccessor={d => d[id.low]} stroke={color.darkRed} />
                    <XAxis axisAt="bottom" orient="bottom" ticks={4}/>
                    <MouseCoordinateX at="bottom" orient="bottom" displayFormat={timeFormat("%_d %b %y, %I:%M %p")} />
                </Chart>
                <CrossHairCursor />
            </ChartCanvas>
        </div>
    );
  }
}

export default TrendSummary