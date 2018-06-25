import React,{Component} from 'react'
import Loading from '../../Loading/Loading'
import Presenter from './Presenter'
import TweetBlock from './ViewHolder/TweetBlock'
import {string} from '../../../Values/Constants'
import PieChart from '../../PieChart/PieChart';

class Twitter extends Component{
    constructor(props){
        super(props)
        this.state={
            cluster:[],
            clusterTweets:[],
            color:[],
            total:0,
            data:[],
            isLoading:true,
            expand:[],
        }
        this.presenter=new Presenter(this)
        this.handleExpand=this.handleExpand.bind(this)
    }
    componentDidMount(){
        if((this.props.isSpecific!==undefined || this.props.isSpecific!=null) && this.props.isSpecific){
            this.presenter.getSpecificTweets(this.props.from)
        }else{
            // this.presenter.getGoodBadTweets(this.props.count)
        }
        this.presenter.getClusterTweets()
    }
    componentWillUnmount(){
        this.presenter.script=undefined
    }
    handleExpand(index){
        const expand=this.state.expand
        expand[index]=!expand[index]
        this.setState({
            expand:expand,
        })
    }
    render(){
        if(this.state.cluster.length>0){
            var clus=-1
            const list=[]
            for(var idx in this.state.clusterTweets){
                list.push(
                    <div key={idx} className='twitter-cluster-container'>
                        {idx}
                        <div className='twitter-cluster-title' key={`clus_${idx}`} style={{background:this.state.color[idx], color:this.state.color[idx]}} onClick={this.handleExpand.bind(this,idx)}>Cluster - {idx}</div>
                        <div className={this.state.expand[idx]?'expand':'collapse'}>{this.state.clusterTweets[idx].map((item,index)=><TweetBlock key={index} data={item}/>)}</div>
                    </div>
                )
            }
           
            return (
                <div className='twitter-container'>
                    <div className='title-tag-independent'>{string.twitter}</div>
                    <PieChart Width={300} Height={300} Data={this.state.cluster} Total={this.state.total} Color={this.state.color} handleClick={this.handleExpand}/>            
                    {list}
                </div>
            )
        }
        return(<div className='padding-container'><Loading data={this.state.cluster} isLoading={this.state.isLoading}/></div>)
    }
}

export default Twitter