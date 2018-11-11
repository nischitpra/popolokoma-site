import React, {Component} from 'react'
import {id,string} from '../../Values/Constants'
import {url} from '../../Network/URL'
import Loading from '../Loading/Loading'
import CandleChart from '../../Utils/CandleChart';
import StrategyContainer from './ViewHolder/StrategyContainer';
import Presenter from './Presenter'

class StrategyFilter extends Component{
    constructor(props){
        super(props)
        this.state={
            isLoading:true,
            selectedKey:{name:'', from:'',to:'',window:''},
            showWindow:'',
            chartData:[],
            strategyData:[],
        }
        this.presenter=new Presenter(this)
    }

    setSelection(name,from,to,window){
        this.setState({chartData:[],selectedKey:{name:name, from:from, to:to, window:window},showWindow:window[0]})
        this.presenter.getChartData(from,to,window[0])
    }
    setWindowSelection(w){
        this.setState({chartData:[],showWindow:w})
        this.presenter.getChartData(this.state.selectedKey.from,this.state.selectedKey.to,w)
    }
    openCandleStickChart(){
        window.open(url.own.base+url.own.candle_chart(this.state.selectedKey.from,this.state.selectedKey.to))
    }
    openStrategyDetail(){
        alert("will open strategy details page")
    }
    componentWillMount(){
        this.presenter.getStrategyData()
    }
    
    componentWillUnmount(){

    }
    render(){
        if(this.state.strategyData.length==0){ return <Loading />}

        return(
            <div className='strategyFilter-container'>
                <h2 style={{textAlign:"center"}}>Strategy Filter</h2>
                {this.state.isLoading?<Loading isLoading={true}/>:""}
                
                <div className='strategyFilter-item-title'>{this.state.selectedKey.name} - {this.state.selectedKey.from}/{this.state.selectedKey.to} <span className='i-info' onClick={()=>this.openStrategyDetail()}/></div>
                {this.state.selectedKey.window.map((item)=><span className={`chart_timeframe_item ${this.state.showWindow==item?'active':''}`} onClick={()=>this.setWindowSelection(item)}>{item} </span>)}
                {this.state.chartData.length>0?<CandleChart className='pointer' windowFrame={this.state.showWindow} data={this.state.chartData} zoom={false} pan={false} onClick={()=>this.openCandleStickChart()}/>:''}
                {this.state.strategyData.map((item)=><StrategyContainer data={item} selectedKey={this.state.selectedKey} setSelection={(name,from,to,window)=>this.setSelection(name,from,to,window)} />)}
            </div>
        )
    }
}

export default StrategyFilter;