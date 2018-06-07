import React, {Component} from 'react'
import Loading from '../../Loading/Loading'
import TrendSummary from '../../TrendSummary/TrendSummary'
import Presenter from './Presenter'
import {string,value,id} from "../../../Values/Constants"
import {url} from "../../../Network/URL"
import { values } from 'd3-collection';
import {Redirect} from 'react-router-dom'
const color =require("../../../Values/Color").Color

class ChartCard extends Component{
    constructor(props){
        super(props)
        this.state={
            from:this.props[id.cryptoCompare.from],
            to:this.props[id.cryptoCompare.to],
            historyType:this.props[id.cryptoCompare.historyType],
            trendSummaryWidth:window.innerWidth,
            redirect:null,
            refresh:false,
            snapshot:null,
            isLoading:false,

        }
        this.presenter= new Presenter(this)
        this.init=this.init.bind(this)
        this.deleteData=this.deleteData.bind(this)
        this.setChartWidth=this.setChartWidth.bind(this)
        this.viewChart=this.viewChart.bind(this)
        this.handleFavourites=this.handleFavourites.bind(this)
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
        var trendsummaryWidth=(this.trendSummaryContainer.clientWidth)
        this.setState({
            trendSummaryWidth:trendsummaryWidth,
        })
    }

    init(){
        this.trendSummary.presenter.getTrendData(this.state.from,this.state.to)
        this.presenter.getSnapshot(this.state.from,this.state.to)
    }
    deleteData(){
        this.trendSummary.setState({
            data:[],
            trend:[],
            volatility:[],
            max:1,
            min:0,
            max_vola:1,
            min_vola:0,
        })
    }

    openTradeApp(){
        if(value.isMobile){
            window.open(url.api.binance.tradePageMobile(id.key.from_to(this.state.from,this.state.to)))
        }else{
            window.open(url.api.binance.tradePage(id.key.from_to(this.state.from,this.state.to)))
        }
        console.log('oepntrade')
    }

    handleFavourites(){
        const favouritesList=this.presenter.getFavouritesList()
        const key=id.key.from_to(this.state.from,this.state.to)
        const index = favouritesList.indexOf(key)
        if(index>-1){
            favouritesList.splice(index,1)
        }else{
            favouritesList.push(key)
        }
        this.presenter.setFavouritesList(favouritesList)

        this.setState({
            refresh:!this.state.refresh
        })
    }
    isFavourite(){
        return this.presenter.getFavouritesList().indexOf(id.key.from_to(this.state.from,this.state.to))>-1
    }
    viewChart(){
        this.setState({
			redirect:<Redirect to={`/${string.navbar.url.favourites}&f=${this.state.from}&t=${this.state.to}`}/>
		})
    }

    render(){
        if(this.state.redirect!=null) return(this.state.redirect)
        
        return(
            <div className='feed-content' ref={container=>this.trendSummaryContainer=container}>
                {this.state.isLoading?<Loading/>:''}
                <div className='title-tag-independent'>{this.state.from}:{this.state.to}</div>
                <TrendSummary ref={obj=>this.trendSummary=obj} from={this.state.from} to={this.state.to} chartWidth={this.state.trendSummaryWidth} overrideInit={true}/>
                {this.state.snapshot!=null?
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
                    :''}
                <div className='feed-bottom-bar-container'>
                    <img src={'/icons/chart.svg'} className="icon-btn flex" onClick={()=>{this.viewChart()}}/>
                    <img src={'/icons/exchange.svg'} className="icon-btn flex" onClick={()=>{this.openTradeApp()}}/>
                    <img src={this.isFavourite()?'/icons/star_active.svg':'/icons/star.svg'} className='icon-btn flex' onClick={()=>{this.handleFavourites()}}/>
                </div>
            </div>
        )
    }
}


export default ChartCard
