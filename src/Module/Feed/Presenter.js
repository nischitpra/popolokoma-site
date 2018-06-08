import React from 'react'
import ChartCard from './Card/ChartCard'
import Interactor from "./Interactor";
import {string,value,id} from "../../Values/Constants"

const MEMORY=value.feed.swip_memory

class Presenter{
    script
    interactor=new Interactor(this)
    constructor(script){
        this.script=script
    }
    getPairList(){
        this.interactor.getPairList()
    }
    startLoading(){
        if(this.script!=undefined)
        this.script.setState({
            isLoading:true,
        })
    }
    stopLoading(){
        if(this.script!=undefined)
        this.script.setState({
            isLoading:false,
        })
    }
    loadFeedList(data){
        const list=[]
        const refList=[]
        for(var i=0;i<10;i++){
            list.push(<div key={i}><ChartCard  ref={container=>refList.push(container)} prevSlide={this.script.prevSlide} nextSlide={this.script.nextSlide} from={data[i][id.cryptoCompare.from]} to={data[i][id.cryptoCompare.to]} interval={data[i][id.cryptoCompare.historyType]} /></div>)
        }
        if(this.script!=undefined)
        this.script.setState({
            slides:list,
            refSlides:refList,
        },()=>{this.loadStartData()})
    }
    loadStartData(){
        for(var i=0;i<MEMORY;i++){
            if(this.script!=undefined)
            this.script.state.refSlides[i].init()
        }
    }
}

export default Presenter