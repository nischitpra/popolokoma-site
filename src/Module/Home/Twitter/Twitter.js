import React,{Component} from 'react'
import Loading from '../../Loading/Loading'
import Presenter from './Presenter'
import TweetBlock from './ViewHolder/TweetBlock'
import {string} from '../../../Values/Constants'
import PieChart from '../../../Utils/PieChart/PieChart';
import CollapsingDiv from '../../../Utils/CollapsingDiv';

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
        this.collapseDiv=[]
        this.presenter=new Presenter(this)
        this.handleExpand=this.handleExpand.bind(this)
    }
    componentDidMount(){
        if((this.props.isSpecific!==undefined || this.props.isSpecific!=null) && this.props.isSpecific){
            this.presenter.getSpecificTweets(this.props.from)
        }
        this.presenter.getClusterTweets()
    }
    componentWillUnmount(){
        this.presenter.script=undefined
    }
    handleExpand(index){
        this.collapseDiv[index].handleToggle()
    }
    
    render(){
        if(this.state.cluster.length>0){
            var clus=-1
            const list=[]
            for(var idx in this.state.clusterTweets){
                const content=(
                        <div>
                            <div className='twitter-cluster-title' style={{background:this.state.color[idx]}}>{this.state.cluster[idx]}</div>
                            {this.state.clusterTweets[idx].map((item,index)=><TweetBlock key={index} data={item} />)}
                        </div>
                    )
                list.push(
                    <CollapsingDiv key={idx}  Content={content} MinHeight={14} ref={container=>this.collapseDiv.push(container)}/>
                )
            }
           
            return (
                <div className='twitter-container'>
                    <h2 style={{textAlign:"center"}}>Tweet Cluster</h2>
                    <div className='flex-container'>
                        <div className='flex-1 center'><PieChart Width={240} Height={240} Data={this.state.cluster} Total={this.state.total} Color={this.state.color} handleClick={this.handleExpand}/></div>
                        <div className='flex-2-5'>{list}</div>
                    </div>
                </div>
            )
        }
        return(<div className='padding-container'><Loading data={this.state.cluster} isLoading={this.state.isLoading}/></div>)
    }
}

export default Twitter