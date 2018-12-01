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
            selectedKey:{name:'', from:'',to:'',window:[] , pairData: {} },
            showWindow:'',
            chartData:[],
        }

        this.strategyData = [],
        this.presenter=new Presenter(this)
    }

    setSelection( name, from, to, window, pairData){
        var data = pairData[window[0]]
        data = data == undefined? []:data
        this.setState({ 
            selectedKey:{ name:name, from:from, to:to, window:window, pairData:pairData },
            showWindow:window[0]
        })
        this.presenter.setChartData(data, window[0])
        // console.log(JSON.stringify(pairData))
    }
    setWindowSelection(w){
        var data = this.state.selectedKey.pairData[w]
        data = data == undefined? []:data
        this.presenter.setChartData(data, w)
    }
    openCandleStickChart(){
        window.open(url.own.base+url.own.candle_chart(this.state.selectedKey.from,this.state.selectedKey.to))
    }
    openStrategyDetail(){
        alert("will open strategy details page")
    }
    componentWillMount(){
    }
    
    componentWillUnmount(){

    }
    render(){
        if(this.strategyData.length==0){ 
            return <Loading isLoading={true}/>
        }
        return(
            <div className='strategyFilter-container'>
                <h2 style={{textAlign:"center"}}>Strategy Filter</h2>
                {this.state.isLoading?<Loading isLoading={true}/>:""}
                
                <div className='strategyFilter-item-title'>{this.state.selectedKey.name} - {this.state.selectedKey.from}/{this.state.selectedKey.to} <span className='i-info' onClick={()=>this.openStrategyDetail()}/></div>
                {this.state.selectedKey.window.map((item)=><span className={`chart_timeframe_item ${this.state.showWindow==item?'active':''}`} onClick={()=>this.setWindowSelection(item)}>{item} </span>)}
                {this.state.chartData.length>0?<CandleChart className='pointer' windowFrame={this.state.showWindow} data={this.state.chartData} zoom={false} pan={false} onClick={()=>this.openCandleStickChart()}/>:''}
                {this.strategyData.map((item)=><StrategyContainer data={item} selectedKey={this.state.selectedKey} setSelection={(name,from,to,window, pairData)=>this.setSelection(name,from,to,window, pairData)} />)}
            </div>
        )
    }
}

export default StrategyFilter;