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
            total:0,
            data:[],
            isLoading:true,
        }
        this.presenter=new Presenter(this)
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
    render(){
        if(this.state.cluster.length>0){
            var clus=-1
            const list=[]
            for(var idx in this.state.clusterTweets){
                list.push(
                    <div className='twitter-cluster-container'>
                        <div className='twitter-cluster-title' key={`clus_${idx}`}>Cluster - {idx}</div>
                        {this.state.clusterTweets[idx].map((item,index)=><TweetBlock key={index} data={item}/>)}
                    </div>
                )
            }
           
            return (
                <div className='twitter-container'>
                    <div className='title-tag-independent'>{string.twitter}</div>
                    <PieChart Width={300} Height={300} Data={this.state.cluster} Total={this.state.total}/>            
                    {list}
                </div>
            )
        }
        return(<div className='padding-container'><Loading data={this.state.cluster} isLoading={this.state.isLoading}/></div>)
    }
}

export default Twitter