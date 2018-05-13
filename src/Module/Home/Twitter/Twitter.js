import React,{Component} from 'react'
import Loading from '../../Loading/Loading'
import Presenter from './Presenter'
import TweetBlock from './ViewHolder/TweetBlock'
class Twitter extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            isLoading:true,
        }
        this.presenter=new Presenter(this)
    }
    componentDidMount(){
        if((this.props.isSpecific!==undefined || this.props.isSpecific!=null) && this.props.isSpecific){
            this.presenter.getSpecificTweets(this.props.from)
        }else{
            this.presenter.getGoodBadTweets(this.props.count)
        }
    }

    render(){
        console.log(`twitter data: ${this.state.data}`)
        const list=this.state.data.map((tweet,index)=><TweetBlock key={index} data={tweet}/>)
        if(list.length>0){
            return(<div className='flex-container'>{list}</div>)
        }
        return(<div className='padding-container'><Loading data={list} isLoading={this.state.isLoading}/></div>)
    }
}

export default Twitter