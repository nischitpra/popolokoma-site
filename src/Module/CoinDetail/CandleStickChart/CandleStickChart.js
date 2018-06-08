import React, {Component} from 'react'
import Presenter from './Presenter'
import Loading from '../../Loading/Loading'
import { format } from "d3-format"
import { timeFormat } from "d3-time-format"
import { scaleTime } from "d3-scale"
import { utcMinute, utcHour, utcDay } from "d3-time"
import { ChartCanvas, Chart } from "react-stockcharts"
import { AreaSeries,BarSeries,CandlestickSeries } from "react-stockcharts/lib/series"
import { XAxis, YAxis } from "react-stockcharts/lib/axes"
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils"
import { OHLCTooltip } from "react-stockcharts/lib/tooltip"
import { CrossHairCursor, EdgeIndicator, MouseCoordinateX, MouseCoordinateY,} from "react-stockcharts/lib/coordinates"

import SMA from './Indicators/SMA'
import EMA from './Indicators/EMA'
import MACD from './Indicators/MACD'
import RSI from './Indicators/RSI'
import ATR from './Indicators/ATR'
import ParabolicSAR from './Indicators/ParabolicSAR'
import StochasticOscillator from './Indicators/StochasticOscillator'
import ElderRay from './Indicators/ElderRay'
import BollingerBand from './Indicators/BollingerBand'
import {id,string, value} from '../../../Values/Constants'

import { TrendLine,DrawingObjectSelector } from "react-stockcharts/lib/interactive"
import { toObject } from "react-stockcharts/lib/utils"


const color =require("../../../Values/Color").Color

const padding=10;

var prevHistoryType='';
class CandleStickChart extends Component{
    presenter = new Presenter(this)
    constructor(props){
        super(props)
        this.state={
            historyMinute:[],
            historyHour:[],
            historyDay:[],
            enableTrendLine: false,
            trends_1: [],
            lineColor: color.green,
            snapshot:{[id.close]:0.0,[id.price]:0.0,[id.open]:0.0,[id.high]:0.0,[id.low]:0.0,[id.volume]:0.0},
            isLoading:true,
            exportLoading:false,
            loadmoreLock:false,
        }
        this.downloadMoreHistory = this.downloadMoreHistory.bind(this)
        this.handleSelection = this.handleSelection.bind(this)
		this.getInteractiveNodes = this.getInteractiveNodes.bind(this)
		this.onDrawCompleteChart1 = this.onDrawCompleteChart1.bind(this)        
        this.saveInteractiveNodes = this.saveInteractiveNodes.bind(this)
        this.drawTrendLine = this.drawTrendLine.bind(this)
        this.deleteTrendLine = this.deleteTrendLine.bind(this)
    }
    
    componentDidMount(){
        document.title=`${this.props.from}:${this.props.to}`
        const type=this.presenter.getHistoryType()
        var refrate=value.binance.candle_interval[`_${type}`]

        this.presenter.init(this.props.from,this.props.to,this.props.exchange,refrate)
    }
    componentWillReceiveProps(newProps){
        // handle props for undefined state
        if(this.props!==undefined){
            var type=this.presenter.getHistoryType()
            if(prevHistoryType!==type){
                var refrate=value.binance.candle_interval[`_${type}`]
                this.presenter.init(this.props.from,this.props.to,this.props.exchange,refrate)
                prevHistoryType=type
            }
            
            const _id=newProps.handleTrendLineId
            if(_id!==this.props.handleTrendLineId){
                switch(_id){
                    case id.drawLine:
                        this.drawTrendLine()
                        break
                    case id.deleteLine:
                        this.deleteTrendLine()
                        break
                    case id.red:
                        this.colorTrendLine(color.darkRed)
                        break
                    case id.green:
                        this.colorTrendLine(color.darkGreen)
                        break
                    case id.blue:
                        this.colorTrendLine(color.darkBlue)
                        break
                    default:
                        break
                }
            }
        }
        
    }
    componentWillUnmount(){
        document.title=string.projectName
        clearInterval(this.state.interval)
        this.presenter.script=undefined
    }
    getInteractiveNodes() {
        return this.interactiveNodes
    }
    colorTrendLine(value){
        this.setState({lineColor:value})
    }
    handleSelection(interactives) {
		const state = toObject(interactives, each => {
			return [
				`trends_${each.chartId}`,
				each.objects,
			];
		});
		this.setState(state);
    }
    deleteTrendLine(){
        var index=0
        var list=this.state.trends_1
        if(list!==undefined && list!==null){
            for(var i=0;i<this.state.trends_1.length;i++){
                if(list[i].selected){
                    index =i
                    break;
                }
            }
            list.splice(index, 1)
            this.setState({
                enableTrendLine: false,
                trends_1: list,
            })
            this.presenter.saveLine(this.props.from,this.props.to,list)
        }
        this.props.resetLineTool()
    }
    drawTrendLine(){
        this.setState({
            enableTrendLine: true
        })
    }
	onDrawCompleteChart1(trends_1) {
        trends_1[trends_1.length-1].start[0]=new Date(trends_1[trends_1.length-1].start[0]).getTime()
        trends_1[trends_1.length-1].end[0]=new Date(trends_1[trends_1.length-1].end[0]).getTime()

		this.setState({
			enableTrendLine: false,
			trends_1:trends_1,
        })
        this.presenter.saveLine(this.props.from,this.props.to,trends_1)
        this.props.resetLineTool()
    }
    saveInteractiveNodes(type, chartId) {
        return node => {
            if (this.interactiveNodes==null) {
                this.interactiveNodes = {}
            }
            const key = `${type}_${chartId}`;
            if (node!=null || this.interactiveNodes[key]!=null) {
                this.interactiveNodes[key] = { type, chartId, node }
            }
        };
    }
    sum(total,num){
        return total+num
    }
    convertMillsToEpoch(mills){
        return Math.ceil(mills/1000)
    }
    downloadMoreHistory(start,end){
        this.presenter.fetchCandleStick(this.props.from,this.props.to,this.presenter.getStartTimeHistory(end.getTime(),1000),end.getTime()-1,false)
    }
    render(){
        var pipelineOverlayCandleStick=[]
        var pipelineRender=[]
        var pipelineHeight=[]
        const historyType=this.presenter.getHistoryType()
        var data=historyType===id.binance.candle_interval._1m?this.state.historyMinute:
        historyType===id.binance.candle_interval._1h?this.state.historyHour:this.state.historyDay

        if(data.length>0){
            document.title=`${this.props.from}:${this.props.to} - ${data[data.length-1][id.history.close]}`
            
            var str=(data[0][id.history.close]+"")
            var decimalPlaces=str.substring(str.indexOf('.'),str.length).length
            var extraSpace = 9-decimalPlaces
            if(decimalPlaces>9){
                decimalPlaces=decimalPlaces-extraSpace
                extraSpace = 9-decimalPlaces
            }

            /**
             * This is for the simple moving average (sma)
             */
            var yExtent=[]
            if(this.presenter.getToolbar().sma){
                const _sma=new SMA()
                var smaChart=_sma.renderList
                yExtent=yExtent.concat(_sma.accessorList)
                data=_sma.calculateData(data)
                pipelineOverlayCandleStick.push(smaChart)
            }
            /**
             * This is for the exponential moving average (ema)
             */
            if(this.presenter.getToolbar().ema){
                const _ema=new EMA()
                var emaChart=_ema.renderList
                yExtent=yExtent.concat(_ema.accessorList)
                data=_ema.calculateData(data)
                pipelineOverlayCandleStick.push(emaChart)
            }
            /**
             * This is for the parabolic SAR
             */
            if(this.presenter.getToolbar().parabolicSAR){
                const _sar=new ParabolicSAR()
                var sarChart=_sar.renderList
                yExtent=yExtent.concat(_sar.accessorList)
                data=_sar.calculateData(data)
                pipelineOverlayCandleStick.push(sarChart)
            }
            /**
             * This is for the bollinger band bb
             */
            if(this.presenter.getToolbar().bollingerBand){
                const _bb=new BollingerBand()
                var bbChart=_bb.renderList
                yExtent=yExtent.concat(_bb.accessorList)
                data=_bb.calculateData(data)
                pipelineOverlayCandleStick.push(bbChart)
            }

            if(this.presenter.getToolbar().horizontalLine){
                pipelineOverlayCandleStick.push(
                <TrendLine
                    ref={this.saveInteractiveNodes("Trendline", 1)}
                    enabled={this.state.enableTrendLine}
                    type="XLINE"
                    // type="XLINE"
                    appearance= {{ stroke: this.state.lineColor,strokeOpacity:0.75, strokeWidth:2, }}
                    snap={false}
                    snapTo={d => [d.high, d.low]}
                    onStart={() => console.log("START")}
                    onComplete={this.onDrawCompleteChart1}
                    trends={this.state.trends_1}
                    />
                )
                var drawingSelector=<DrawingObjectSelector
                    enabled={!this.state.enableTrendLine}
                    getInteractiveNodes={this.getInteractiveNodes}
                    drawingObjectMap={{Trendline: "trends"}}
                    onSelect={this.handleSelection}/>
            }
            const xAccessor = (d) => {
                return new Date(parseInt(d._id))
            }
            const xExtents = [ xAccessor(last(data)), xAccessor(data[data.length - Math.min(100,Math.round(data.length*0.7))]) ]

            /**
             * this is for the area chart candle stick chart
             */
            if(this.presenter.getToolbar().areaChart){
                yExtent.push(d => [parseFloat(d.close)])
                var areaChart=(<Chart id={0} yExtents={yExtent} height={value.isMobile?this.props.chartWidth*value.chartHeightRatio:this.props.chartWidth*0.6*value.chartHeightRatio}>
                    {value.isMobile?(""):<YAxis axisAt="right" orient="right" ticks={5} displayFormat={format(`.${decimalPlaces}f`)} />}
                    {value.isMobile?(""):<MouseCoordinateY at="right" orient="right" displayFormat={format(`.${decimalPlaces}f`)} />}
                    {value.isMobile?(""):<EdgeIndicator 
                        itemType="last" 
                        orient={value.isMobile?"left":"right"}
                        edgeAt="right"
                        yAccessor={d => parseFloat(d.close)} 
                        displayFormat={format(`.${decimalPlaces}f`)}
                        fill={d => parseFloat(d.close) > parseFloat(d.open) ? color.green : color.red }/>}
                    
                    <OHLCTooltip origin={(w, h) => [0, value.isMobile?h-10:-5]} ohlcFormat={value.isMobile?format(".4s"):format(".9f")} accessor= {d => {
                        const acc={date: parseInt(d._id), open: parseFloat(d.open),high: parseFloat(d.high),low: parseFloat(d.low),close: parseFloat(d.close),volume: parseFloat(d.volume) }
                        return acc}}
                        xDisplayFormat={value.isMobile?timeFormat("%_d.%m.%y %H:%M"):timeFormat("%_d %b %y, %I:%M %p")}
                        />}
                    <AreaSeries yAccessor={d => parseFloat(d.close)}/>
                    {pipelineOverlayCandleStick}
                    </Chart>)
                pipelineRender.push(areaChart)
                pipelineHeight.push((value.isMobile?this.props.chartWidth*value.chartHeightRatio:this.props.chartWidth*0.6*value.chartHeightRatio)-100)
            }else{
                yExtent.push(d => [d.high, d.low])
                var timeRange= historyType===id.binance.candle_interval._1m?utcMinute:historyType===id.binance.candle_interval._1h?utcHour:utcDay
                areaChart=(<Chart id={1} yExtents={yExtent} height={value.isMobile?this.props.chartWidth*value.chartHeightRatio:this.props.chartWidth*0.6*value.chartHeightRatio}>
                    {value.isMobile?(""):<YAxis axisAt="right" orient="right" ticks={5} displayFormat={format(`.${decimalPlaces}f`)} />}
                    {value.isMobile?(""):<MouseCoordinateY at="right" orient="right" displayFormat={format(`.${decimalPlaces}f`)} />}
                    {value.isMobile?(""):<EdgeIndicator 
                        itemType="last" 
                        orient={value.isMobile?"left":"right"}
                        edgeAt="right"
                        yAccessor={d => parseFloat(d.close)} 
                        displayFormat={format(`.${decimalPlaces}f`)}
                        fill={d => parseFloat(d.close) > parseFloat(d.open) ? color.green : color.red }/>}
                    
                    <OHLCTooltip origin={(w, h) => [0, value.isMobile?h-10:-5]} ohlcFormat={value.isMobile?format(".4s"):format(".9f")} accessor= {d => {
                        const acc={date: parseInt(d._id), open: parseFloat(d.open),high: parseFloat(d.high),low: parseFloat(d.low),close: parseFloat(d.close),volume: parseFloat(d.volume) }
                        return acc}}
                        xDisplayFormat={value.isMobile?timeFormat("%_d.%m.%y %H:%M"):timeFormat("%_d %b %y, %I:%M %p")}
                        />}
                    <CandlestickSeries width={timeIntervalBarWidth(timeRange)}
                       wickStroke={(d)=>d.close > d.open ? color.green : color.brightRed}
                       fill={(d)=>d.close > d.open ? color.green : color.brightRed}
                       stroke={(d)=>d.close > d.open ? color.green : color.brightRed}
                       candleStrokeWidth={1}
                       straightLineStroke= "#000000"
                       widthRatio={0.5}
                       opacity={1}
                    />
                    {pipelineOverlayCandleStick}
                </Chart>)
                pipelineRender.push(areaChart)
                pipelineHeight.push((value.isMobile?this.props.chartWidth*value.chartHeightRatio:this.props.chartWidth*0.6*value.chartHeightRatio)-100)
            }

            /**
             * This shows the volume traded
             */
            if(this.presenter.getToolbar().volumeBar){
                var posVolume=pipelineHeight.reduce(this.sum)
                var volumeChart=(<Chart id={2} yExtents={d => parseFloat(d.volume)} 
                    height={100}
                    origin={(w, h) => [0, posVolume]}
                    >
                        {/* <YAxis axisAt="left" orient="left" ticks={3} tickFormat={format(".2s")}/> */}
                        {/* <MouseCoordinateY at="left" orient="left" displayFormat={format(".2s")} /> */}
                        <BarSeries yAccessor={d => parseFloat(d.volume)} 
                        fill={d => parseFloat(d.close) > d.open ? color.green : color.brightRed }
                        opacity={0.3}
                        stroke={false}
                        />
                    </Chart>)
                pipelineRender.push(volumeChart)
            }
            pipelineHeight.push(100)

             /**
             * This is for the Moving Average Convergence Divergence (MACD)
             */
            if(this.presenter.getToolbar().macd){
                const _macd=new MACD()
                data=_macd.calculateData(data)
                var posMacd=pipelineHeight.reduce(this.sum)+2*padding
                var macdChart=_macd.render(posMacd)
                pipelineRender.push(macdChart)
                pipelineHeight.push(_macd.chartSize+2*padding)
            }
             /**
             * This is for the RSI
             */
            if(this.presenter.getToolbar().rsi){
                const _rsi=new RSI()
                data=_rsi.calculateData(data)
                var posRsi=pipelineHeight.reduce(this.sum)+padding
                var rsiChart=_rsi.render(posRsi)
                pipelineRender.push(rsiChart)
                pipelineHeight.push(_rsi.chartSize+padding)
            }
            /**
             * This is for the ATR
             */
            if(this.presenter.getToolbar().atr){
                const _atr=new ATR()
                data=_atr.calculateData(data)
                var posAtr=pipelineHeight.reduce(this.sum)+padding
                var atrChart=_atr.render(posAtr)
                pipelineRender.push(atrChart)
                pipelineHeight.push(_atr.chartSize+padding)
            }
            /**
             * This is for the Stochastic Oscillator (STO)
             */
            if(this.presenter.getToolbar().stochasticOscillator){
                const _sto=new StochasticOscillator()
                data=_sto.calculateData(data)
                var posSto=pipelineHeight.reduce(this.sum)+padding
                var stoChart=_sto.render(posSto)
                pipelineRender.push(stoChart)
                pipelineHeight.push(_sto.chartSize+padding)
            }
            /**
             * This is for the Elder Ray (ER)
             */
            if(this.presenter.getToolbar().elderRay){
                const _er=new ElderRay()
                data=_er.calculateData(data)
                var posEr=pipelineHeight.reduce(this.sum)+padding
                var erChart=_er.render(posEr)
                pipelineRender.push(erChart)
                pipelineHeight.push(_er.chartSize+padding)
            }

            var height=value.isMobile?(pipelineHeight.reduce(this.sum)+20):(pipelineHeight.reduce(this.sum)+40)// this 40 is from the margin  10 from upper padding
            const snapshot = 
                <div className='feed-snapshot-main-container'>
                    <div className='title-tag'>{string.cc.snapshot}</div>
                    <div className='feed-snapshot-container'>
                        <div className='feed-snapshot-left'>{string.cc.change}</div>
                        <div className={`feed-snapshot-right ${this.state.snapshot[id.snapshot.priceChange]>0?'green-text':this.state.snapshot[id.snapshot.priceChange]<0?'red-text':''}`}>{this.state.snapshot[id.snapshot.priceChange]} ({parseFloat(this.state.snapshot[id.snapshot.priceChangePercent]).toFixed(2)}%)</div>
                        
                        <div className='feed-snapshot-left'>{string.cc.open}</div>
                        <div className='feed-snapshot-right'>{this.state.snapshot[id.snapshot.openPrice]}</div>

                        <div className='feed-snapshot-left'>{string.cc.high}</div>
                        <div className='feed-snapshot-right'>{this.state.snapshot[id.snapshot.highPrice]}</div>

                        <div className='feed-snapshot-left'>{string.cc.low}</div>
                        <div className='feed-snapshot-right'>{this.state.snapshot[id.snapshot.lowPrice]}</div>

                        <div className='feed-snapshot-left'>{string.cc.close}</div>
                        <div className='feed-snapshot-right'>{this.state.snapshot[id.snapshot.prevClosePrice]}</div>

                        <div className='feed-snapshot-left'>{string.cc.volume}</div>
                        <div className='feed-snapshot-right'>{parseFloat(this.state.snapshot[id.snapshot.volume]).toFixed(2)}</div>
                    </div>
                </div>
                // : <div className={'snapshot'}>{string.snapshot(this.state.snapshot[id.snapshot.priceChange],this.state.snapshot[id.snapshot.openPrice],this.state.snapshot[id.snapshot.highPrice],this.state.snapshot[id.snapshot.lowPrice],this.state.snapshot[id.snapshot.volume],this.state.snapshot[id.snapshot.priceChangePercent])}</div>
            
            return(<div >
                    <div className={'candle-stick-container chart'}>
                        <div className='title-tag'>{string.cc.priceMovement}</div>
                        <ChartCanvas 
                            height={height}
                            width={this.props.chartWidth}
                            ratio={3}
                            margin={value.isMobile?{ left: 0, right: 8, top:20, bottom: 0 }:{ left: 0, right: (105-extraSpace*3), top: 10, bottom: 30 }}
                            type={'hybrid'}
                            seriesName="MSFT"
                            data={data}
                            xAccessor={xAccessor}
                            xExtents={xExtents}
                            xScale={scaleTime()}
                            displayXAccessor={xAccessor}
                            xExtents={xExtents}
                            onLoadMore={this.downloadMoreHistory}
                            zoomEvent={value.isMobile?false:true}
                            clamp={false}
                            >
                        
                            {pipelineRender}
                            
                            <Chart id={10} yExtents={d => [parseFloat(d.high), parseFloat(d.low)]}>
                                <XAxis axisAt={value.isMobile?"top":"bottom"} orient={value.isMobile?"top":"bottom"}/>
                                <MouseCoordinateX at={value.isMobile?"top":"bottom"} orient={value.isMobile?"top":"bottom"} displayFormat={timeFormat("%_d %b %y, %I:%M %p")} />
                            </Chart>
                            <CrossHairCursor />
                            {drawingSelector}
                        </ChartCanvas>
                    </div>
                    {snapshot}
                </div>)
        }
        return(<div><Loading data={data} isLoading={this.state.isLoading}/></div>)
    }
}
export default CandleStickChart