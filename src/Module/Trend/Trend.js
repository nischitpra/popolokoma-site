import React, { Component } from 'react'
import {id,string} from '../../Values/Constants'
import SentimentTrend from '../SentimentTrend/SentimentTrend';
import ForecastTrend from '../ForecastTrend/ForecastTrend';
import Presenter from './Presenter';
import Loading from '../Loading/Loading';
import matchSorter from 'match-sorter'
import ReactTable from "react-table"
import {Redirect} from 'react-router-dom'

const color =require("../../Values/Color").Color

class Trend extends Component{
    presenter=new Presenter(this)
    constructor(props){
        super(props)
        this.state={
            isLoading:true,
            data:[],
            redirect:null,
            tab:id.trend.all,
        }
        this.switchTab=this.switchTab.bind(this)
    }
  
    componentDidMount(){
        this.presenter.getTrendData(this.state.tab)
    }
    componentWillUnmount(){
        this.presenter.script=undefined
    }
    loadPage(from,to){
        this.setState({
            redirect:<Redirect to={`/${string.navbar.url.favourites}&f=${from}&t=${to}`}/>
        })
    }
    switchTab(_id){
        this.setState({
            data:[],
            tab:_id,
        },this.presenter.getTrendData(_id))
    }

    render() {
    if(this.state.redirect!=null) return(this.state.redirect)
    
    const data=this.state.data
    const column=[
        {Header: string.trend.from, accessor:'from', filterMethod: (filter, rows) =>matchSorter(rows, filter.value, { keys: ["from"] }),filterAll: true},
        {Header: string.trend.to, accessor:'to', filterMethod: (filter, rows) =>matchSorter(rows, filter.value, { keys: ["to"] }),filterAll: true},
        {Header: string.trend.trend, accessor:'trend', Cell:row=>(<span>{row.value>0?string.rising:row.value<0?string.falling:string.consolidating}</span>)},
        {Header: string.trend.confidence, accessor:'confidence', },
        // {Header: 'Velocity', accessor:'velocity'},
        {Header: string.trend.startTime, accessor:'start_time',},
        {Header: string.trend.endTime, accessor:'end_time',},
    ]
    return (
        <div className='trend-container' style={{overflowX: "auto"}}>
            <div className='title-tag'>{string.trendFilter}</div>
            <div className='trend-toolbar'>
                <span className={this.state.tab===id.trend.all?'trend-toolbar-item active':'trend-toolbar-item'} onClick={()=>this.switchTab(id.trend.all)}>{string.trend.all}</span>
                <span className={this.state.tab===id.trend.rise?'trend-toolbar-item active':'trend-toolbar-item'} onClick={()=>this.switchTab(id.trend.rise)}>{string.trend.rise}</span>
                <span className={this.state.tab===id.trend.consolidate?'trend-toolbar-item active':'trend-toolbar-item'} onClick={()=>this.switchTab(id.trend.consolidate)}>{string.trend.consolidate}</span>
                <span className={this.state.tab===id.trend.fall?'trend-toolbar-item active':'trend-toolbar-item'} onClick={()=>this.switchTab(id.trend.fall)}>{string.trend.fall}</span>
            </div>
            <Loading isLoading={this.state.isLoading}/>
            <ReactTable data={data} columns={column} pageSize={data.length>20?20:data.length} className="-striped -highlight" 
                showPageSizeOptions={false}
                getTrProps={(state, rowInfo, column) => {
                    if(rowInfo==null) return{}
                    return {
                        onClick: (e) => {
                            this.loadPage(rowInfo.original.from,rowInfo.original.to)
                        },
                        style:{
                            backgroundColor: rowInfo.original.trend>0? color.green_translucent : rowInfo.original.trend<0 ? color.red_translucent : color.yellow_translucent
                        }
                    }
                }}
                filterable={true}/>
        </div>
    );
  }
}

export default Trend