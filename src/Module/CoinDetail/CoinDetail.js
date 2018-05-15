import React,{Component} from 'react'
import Presenter from './Presenter'
import CandleStickChart from './CandleStickChart/CandleStickChart'
import Toolbar from './Toolbar/Toolbar'
import Twitter from '../Home/Twitter/Twitter'
import SentimentTrend from '../SentimentTrend/SentimentTrend'
import ForecastTrend from '../ForecastTrend/ForecastTrend'
import TrendSummary from '../TrendSummary/TrendSummary'
import {string} from '../../Values/Constants'

class CoinDetail extends Component{
    presenter = new Presenter(this)
    constructor(props){
        super(props)
        this.state={
            from: this.props.from,
            to: this.props.to,
            exchange:this.props.exchange,
            type:2,
            refreshPage:false,
            handleTrendLineId:'',
            panelHeight:window.innerHeight-40,
        }
        this.refreshPage=this.refreshPage.bind(this)
        this.handleTrendLine=this.handleTrendLine.bind(this)
        this.resetLineTool=this.resetLineTool.bind(this)
        this.setChartWidth=this.setChartWidth.bind(this)
    }
    componentDidMount(){
      this.setChartWidth()
      window.addEventListener("resize", this.setChartWidth);
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.setChartWidth);
    }
    setChartWidth(){
      var sentiWidth=(this.sentiContainer.clientWidth)
      var trendsummaryWidth=(this.trendContainer.clientWidth)
      var candleWid=(this.candleContainer.clientWidth)
      var forecastWidth=(this.forecastContainer.clientWidth)
      this.setState({
            candle_chartWidth:candleWid-2,
            sentiment_chartWidth:sentiWidth-2,
            forecast_chartWidth:forecastWidth-2,
            trendsummary_chartWidth:trendsummaryWidth-2,
      })
    }
    refreshPage(){
        this.setState({
            refreshPage:!this.state.refreshPage,
            handleTrendLineId:''
        })
    }
    handleTrendLine(_id){
        this.setState({
            handleTrendLineId:_id
        })
    }
    resetLineTool(){
        this.setState({
            handleTrendLineId:''
        })
    }
    componentWillUpdate(){
        console.log('coin detail: handleTrendLineId: '+this.state.handleTrendLineId)
    }
    render(){
        console.log('render id: '+this.state.handleTrendLineId)
        return(
            <div>
                <div className='favourites-toolbar-margin padding-container' ref={candleContainer=>this.candleContainer=candleContainer}>
                    <Toolbar from={this.state.from} to={this.state.to} refreshPage={this.refreshPage} handleTrendLine={this.handleTrendLine} handleTrendLineId={this.state.handleTrendLineId}/>
                </div>
                <div className='padding-container'>
                    <CandleStickChart from={this.state.from} to={this.state.to} exchange={this.state.exchange}  
                     handleTrendLineId={this.state.handleTrendLineId} resetLineTool={this.resetLineTool} chartWidth={this.state.candle_chartWidth}/> 
                </div>
                <div className='flex-container'>
                    <div className='home-left-panel padding-container' >
                        <div className='title-tag' ref={forecastContainer=>this.forecastContainer=forecastContainer}>{string.forecastTrend}</div>
                        <div><ForecastTrend from={this.state.from} to={this.state.to} type={this.state.type} exchange={this.state.exchange} chartWidth={this.state.forecast_chartWidth}/></div>
                        <div className='title-tag' ref={sentiContainer=>this.sentiContainer=sentiContainer}>{string.sentimentTrend}</div>
                        <div><SentimentTrend chartWidth={this.state.sentiment_chartWidth}/></div>
                        <div className='title-tag' ref={trendContainer=>this.trendContainer=trendContainer}>{string.trendSummary}</div>
                        <div><TrendSummary from={this.state.from} to={this.state.to} chartWidth={this.state.trendsummary_chartWidth}/></div>
                    </div>
                    <div className='home-right-panel '>
                        <div className='title-tag padding-container'>{string.twitter}</div>
                        <Twitter count={7}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default CoinDetail