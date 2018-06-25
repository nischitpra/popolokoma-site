import React, { Component } from 'react'
import { BTrendLine } from "react-stockcharts/lib/interactive"
import Presenter from './Presenter'

class Levels extends Component{
    constructor(props){
        super(props)
        this.presenter=new Presenter(this)
        this.state={
            scaleTo:this.props.scaleTo,
            levels:[],
        }
    }
    componentWillMount(){
        this.presenter.getLevels(this.props.from,this.props.to)        
    }
    componentWillUnmount(){
        this.presenter.script=undefined
    }

    render(){
        return(
            <BTrendLine
                enabled={true}
                onStart={() => console.log("START")}
                snap={false}
                enabled={false}
                trends={this.state.levels}
                onComplete={() => console.log("on complete")}
            />
        )
    }
}

export default Levels
