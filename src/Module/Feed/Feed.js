import React, {Component} from 'react'
import ReactSwipe from 'react-swipe'
import Loading from '../Loading/Loading'
import ChartCard from './Card/ChartCard'
import Presenter from './Presenter'
import {string,value} from "../../Values/Constants"
const color =require("../../Values/Color").Color
const MEMORY=value.feed.swip_memory

class Feed extends Component{
    constructor(props){
        super(props)
        this.state={
            isLoading:true,
            slides:[],
            refSlides:[],
            position:0,
        }
        this.processChange=this.processChange.bind(this)
        this.presenter=new Presenter(this)
    }
    componentWillMount(){
        this.presenter.getPairList()
    }
    componentDidMount(){
        this.props.setNavbarTab(string.navbar.url.feed)
    }
     componentWillUnmount(){
         this.presenter.script=undefined
     }

    processChange(index,slide,context){
        const pos=context.state.position
        if(pos-index<0){
            /** swipe right so should delete left of current position */
            if(pos-MEMORY>0){context.state.refSlides[pos-MEMORY].deleteData()}
            context.state.refSlides[Math.min(pos+MEMORY,context.state.refSlides.length-1)].init()
        }else if(pos-index>0){
            /** swipe left so should delete right of current position */
            if(pos+MEMORY<context.state.refSlides.length){context.state.refSlides[pos+MEMORY].deleteData()}
            context.state.refSlides[Math.max(pos-MEMORY,0)].init()
        }else{
            /** didnot change position */
        }
        context.setState({
            position: index,
        })
    }
    swipeOptions={
        continuous:false,
        callback(index,slide){
            /** triggered when screen is changed */
            this.processChange(index,slide,this.context)
        },
        processChange:this.processChange,
        context:this,
    }

    render(){
        if(this.state.slides.length>0 && !this.state.isLoading){
            return(
                <div >
                    <ReactSwipe swipeOptions={this.swipeOptions}>
                        {this.state.slides}
                    </ReactSwipe>
                </div>
            )
        }else{
            return(<Loading data={this.state.slides} isLoading={this.state.isLoading}/>)
        }
        
    }
}


export default Feed
