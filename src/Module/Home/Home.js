import React, { Component } from 'react'
import {id,string} from '../../Values/Constants'
import HomeNews from './HomeNews/HomeNews'
import Twitter from './Twitter/Twitter';
import SentimentTrend from '../SentimentTrend/SentimentTrend';
import ForecastTrend from '../ForecastTrend/ForecastTrend';
import Trend from '../Trend/Trend';
import FilterCoins from '../FilterCoins/FilterCoins';

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
    if(this.sentiContainer==null || this.forecastContainer==null || this.sentiContainer==undefined || this.forecastContainer==undefined) return
    var sentiWidth=(this.sentiContainer.clientWidth) // padding 
    var forecastWidth=(this.forecastContainer.clientWidth) //padding
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
      <div className='home-container'>
          <div ref={forecastContainer=>this.forecastContainer=forecastContainer}>
            {/* <ForecastTrend from={this.state.from} to={this.state.to} type={this.state.type} exchange={this.state.exchange} chartWidth={this.state.forecastWidth}/> */}
          </div>
          <HomeNews type={id.news.headlines} count={9}/>
           {/* need to merge filter coins and trend. Trend should be shown for every pair. */}
          <FilterCoins/>
          <Trend/>
          <div ref={sentiContainer=>this.sentiContainer=sentiContainer}>
            <SentimentTrend chartWidth={this.state.sentiWidth}/>
          </div>
          <Twitter count={7}/>
      </div>
    );
  }
}

export default Home