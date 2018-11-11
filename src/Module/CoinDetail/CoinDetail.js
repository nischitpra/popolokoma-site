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
        this.presenter.script=undefined
    }
    setChartWidth(){
    //   var sentiWidth=(this.sentiContainer.clientWidth)
    //   var trendsummaryWidth=(this.trendContainer.clientWidth)
      var candleWid=(this.candleContainer.clientWidth)
    //   var forecastWidth=(this.forecastContainer.clientWidth)
      this.setState({
            candle_chartWidth:candleWid,
            // sentiment_chartWidth:sentiWidth,
            // forecast_chartWidth:forecastWidth,
            // trendsummary_chartWidth:trendsummaryWidth,
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
    }
    render(){
        return(
            <div className='coindetail-container'>
                <Toolbar from={this.state.from} to={this.state.to} refreshPage={this.refreshPage} handleTrendLine={this.handleTrendLine} handleTrendLineId={this.state.handleTrendLineId}/>
                <div  ref={candleContainer=>this.candleContainer=candleContainer}>
                    <CandleStickChart from={this.state.from} to={this.state.to} exchange={this.state.exchange}  
                     handleTrendLineId={this.state.handleTrendLineId} resetLineTool={this.resetLineTool} chartWidth={this.state.candle_chartWidth}/> 
                </div>
                {/* <div ref={forecastContainer=>this.forecastContainer=forecastContainer}><ForecastTrend from={this.state.from} to={this.state.to} type={this.state.type} exchange={this.state.exchange} chartWidth={this.state.forecast_chartWidth}/></div> */}
                {/* <div ref={sentiContainer=>this.sentiContainer=sentiContainer}><SentimentTrend chartWidth={this.state.sentiment_chartWidth}/></div> */}
                {/* <div ref={trendContainer=>this.trendContainer=trendContainer}><TrendSummary from={this.state.from} to={this.state.to} chartWidth={this.state.trendsummary_chartWidth}/></div> */}
                <div style={{marginTop:12,marginBottom:4}}><Twitter count={7}/></div>
            </div>
        )
    }
}

export default CoinDetail