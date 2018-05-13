import React,{Component} from 'react'
import Presenter from './Presenter'
import ReactTable from "react-table"
import "react-table/react-table.css"
import {string,id} from '../../../Values/Constants'

const color =require("../../../Values/Color").Color

class CurrentTrade extends Component{
    presenter = new Presenter(this)
    constructor(props){
        super(props)
        this.state={
            from:this.props.from,
            to:this.props.to,
            buy:[],
            sell:[],
            tableSize:10,
        }
    }
    componentDidMount(){
        this.presenter.subscribe(this.state.from,this.state.to)
    }
    componentWillUnmount(){
        this.presenter.unsubscribe()
    }
    render(){
        var column=[
			{Header: string.exchange, accessor: id.exchange},
			{Header: string.price, accessor: id.price},
			{Header: string.quantity, accessor: id.quantity},
		]
        return(
        <div>
            <div className='flexContainer'>
                <div className='leftPanel' style={{padding:8}}>
                    <div className='title-currentTrading'>BUY</div>
                    <ReactTable data={this.state.buy} columns={column} defaultPageSize={this.state.tableSize} className="-striped -highlight" 
                        getTrProps={(state, rowInfo, column) => {
                            if(rowInfo==null) return{}
                            return {style: {color: color.green}}
                        }}/>
                </div>
                <div className='rightPanel' style={{padding:8}}>
                    <div className='title-currentTrading'>SELL</div>
                    <ReactTable data={this.state.sell} columns={column} defaultPageSize={this.state.tableSize} className="-striped -highlight" 
                        getTrProps={(state, rowInfo, column) => {
                            if(rowInfo==null) return{}
                            return {style: {color: color.red}}
                        }}/>
                </div>
            </div>
        </div>
        )
    }

}

export default CurrentTrade