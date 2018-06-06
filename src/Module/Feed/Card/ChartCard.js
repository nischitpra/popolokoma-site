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
    }
    setChartWidth(){
        var trendsummaryWidth=(this.trendSummaryContainer.clientWidth)
        this.setState({
            trendSummaryWidth:trendsummaryWidth-2,
        })
    }

    init(){
        this.trendSummary.presenter.getTrendData(this.state.from,this.state.to)
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
            <div ref={container=>this.trendSummaryContainer=container}>
                <h1 style={{textAlign:'center'}}>{this.state.from}:{this.state.to}</h1>
                <TrendSummary ref={obj=>this.trendSummary=obj} from={this.state.from} to={this.state.to} chartWidth={this.state.trendSummaryWidth} overrideInit={true}/>
                <br/>
                <div className='flex btn' onClick={()=>{this.viewChart()}}>View Chart</div>
                <div className='flex btn' onClick={()=>{this.openTradeApp()}}>Trade</div>
                <div className={this.isFavourite()?'flex btn active':'flex btn'} onClick={()=>{this.handleFavourites()}}>Favourite</div>
            </div>
        )
    }
}


export default ChartCard
