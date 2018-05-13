import React,{Component} from 'react'
import Loading from '../../Loading/Loading'
import Presenter from './Presenter'
import NewsCard from './ViewModel/NewsCard'
import NewsStripCard from './ViewModel/NewsStripCard'
import {id} from '../../../Values/Constants'

class HomeNews extends Component{
    constructor(props){
        super(props)
        this.state={
            newsList:[],
            isLoading:true,
        }
        this.presenter=new Presenter(this)
    }
    componentDidMount(){
        this.presenter.getNews(this.props.type, this.props.count,1)
    }
    render(){
        var newsList=[]
        if(this.props.type===id.news.headlines){
            newsList=this.state.newsList.map((item,index)=><NewsCard key={index} details={item}/>)
        }else if(this.props.type===id.news.everything){
            newsList=this.state.newsList.map((item,index)=><NewsStripCard key={index} details={item}/>)
        }
        if(newsList.length>0){
            return(<div className='flex-container'>{newsList}</div>)
        }
        return(<div className='padding-container'><Loading data={newsList} isLoading={this.state.isLoading}/></div>)
    }
}

export default HomeNews