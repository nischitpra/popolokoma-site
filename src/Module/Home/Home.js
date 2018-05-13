import React, { Component } from 'react'
import {id,string} from '../../Values/Constants'
import HomeNews from './HomeNews/HomeNews'
import Twitter from './Twitter/Twitter';
import SentimentTrend from '../SentimentTrend/SentimentTrend';
import ForecastTrend from '../ForecastTrend/ForecastTrend';
import Trend from '../Trend/Trend';

class Home extends Component{
    constructor(props){
		super(props)
		this.state={
      from:'BTC',
      to:'USD',
      exchange:'CCCAGG',
      type:id.history.day,
    }
    this.props.setNavbarTab(string.navbar.url.home)
    this.setChartWidth=this.setChartWidth.bind(this)
  }
  setChartWidth(){
    var sentiWidth=(this.sentiContainer.clientWidth)-8*2 // padding 
    var forecastWidth=(this.forecastContainer.clientWidth)-8*2 //padding
    this.setState({
      sentiWidth:sentiWidth,
      forecastWidth:forecastWidth,
    })
  }
  componentDidMount(){
    this.setChartWidth()
    window.addEventListener("resize", ()=>{
      this.setChartWidth()
    });
  }
  componentWillUnmount(){
      window.removeEventListener("resize",()=>{
        this.setChartWidth()
      });
  }

  render() {
    return (
      <div>
        <div className='flex-container'>
          <div className='home-left-panel ' >
            <div className='padding-container'>
              <div className='title-tag' ref={forecastContainer=>this.forecastContainer=forecastContainer}>{string.forecastTrend}</div>
              <ForecastTrend from={this.state.from} to={this.state.to} type={this.state.type} exchange={this.state.exchange} chartWidth={this.state.forecastWidth}/>
              <div className='title-tag '>{string.headlines}</div>
            </div>
            <div><HomeNews type={id.news.headlines} count={7}/></div>
            <div><Trend/></div>
          </div>
          <div className='home-right-panel'>
            <div className='padding-container'>
              <div className='title-tag' ref={sentiContainer=>this.sentiContainer=sentiContainer}>{string.sentimentTrend}</div>
              <SentimentTrend chartWidth={this.state.sentiWidth}/>
              <div className='title-tag'>{string.twitter}</div>
            </div>
            <Twitter count={7}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home