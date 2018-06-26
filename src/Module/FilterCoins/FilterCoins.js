import React, {Component} from 'react'
import "react-table/react-table.css"
import ReactTable from "react-table"
import matchSorter from 'match-sorter'
import {Redirect} from 'react-router-dom'
import Loading from '../Loading/Loading'
import Presenter from './Presenter'
import {string,value, id} from "../../Values/Constants"

const color =require("../../Values/Color").Color

class FilterCoins extends Component{
    constructor(props){
        super(props)
        this.state={
            stopLossLevel:[],
            isLoading:true,
            redirect:null,
        }
        this.presenter=new Presenter(this)
    }
    componentWillMount(){
        this.presenter.getStopLossLevels();
    }
    componentDidMount(){
    }
    componentWillUnmount(){
        this.presenter.script=undefined
    }
    loadPage(from,to){
        this.setState({
            redirect:<Redirect to={`/${string.navbar.url.favourites}&f=${from}&t=${to}`}/>
        })
    }
    render(){
        if(this.state.redirect!=null){
            return(this.state.redirect)
        }

        const data=this.state.stopLossLevel
        if(data.length>0 && !this.state.isLoading){
            const column=[
                {Header: 'From', accessor:id.db.column.from, filterMethod: (filter, rows) =>matchSorter(rows, filter.value, { keys: [id.db.column.from] }),filterAll: true},
                {Header: 'To', accessor:id.db.column.to, filterMethod: (filter, rows) =>matchSorter(rows, filter.value, { keys: [id.db.column.to] }),filterAll: true},
                {Header: 'Close', accessor:id.db.column.close},
            ]
            return(
                <ReactTable data={data} columns={column} pageSize={data.length>20?20:data.length} className="-striped -highlight" 
                showPageSizeOptions={false}
                getTrProps={(state, rowInfo, column) => {
                    if(rowInfo==null) return{}
                    return {
                        onClick: (e) => {
                            this.loadPage(rowInfo.original[id.db.column.from],rowInfo.original[id.db.column.to])
                        },
                        style:{
                            backgroundColor: rowInfo.original.trend>0? color.green_translucent : rowInfo.original.trend<0 ? color.red_translucent : color.yellow_translucent
                        }
                    }
                }}
                filterable={true}/>
            )
        }else{
            return(<Loading data={data} isLoading={this.state.isLoading}/>)
        }
        
    }
}


export default FilterCoins
