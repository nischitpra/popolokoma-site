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
        }
    }
  
  componentDidMount(){
      this.presenter.getTrendData()
  }
  componentWillUnmount(){
  }
  loadPage(from,to){
    this.setState({
        redirect:<Redirect to={`/${string.navbar.url.favourites}&f=${from}&t=${to}`}/>
    })
}

  render() {
    if(this.state.redirect!=null) return(this.state.redirect)
    
    const data=this.state.data
    const column=[
        {Header: 'F', accessor:'from', filterMethod: (filter, rows) =>matchSorter(rows, filter.value, { keys: ["from"] }),filterAll: true},
        {Header: 'T', accessor:'to', filterMethod: (filter, rows) =>matchSorter(rows, filter.value, { keys: ["to"] }),filterAll: true},
        {Header: 'Trend', accessor:'trend', Cell:row=>(<span>{row.value>0?string.rising:row.value<0?string.falling:string.consolidating}</span>)},
        {Header: 'C', accessor:'confidence', },
        // {Header: 'Velocity', accessor:'velocity'},
        {Header: 'ST', accessor:'start_time',},
        {Header: 'ET', accessor:'end_time',},
    ]
    return (
        <div style={{overflowX: "auto"}}>
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