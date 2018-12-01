import React, {Component} from 'react'

class Row extends Component{
    constructor(props){
        super(props)
    }
    click(){
        this.props.setSelection(this.props.from, this.props.to, this.props.window, this.props.pairData)
    }
    render(){
        return(
        <div className={`strategyfilter-row ${this.props.isSelected?'red-text':''}`} onClick={()=>this.click()}>
            <span>{this.props.from}/{this.props.to}</span>
            <span className={this.props.pchange>0?'green-text':this.props.pchange<0?'red-text':''}>{this.props.pchange>0||this.props.pchange<0?this.props.pchange:'-'}</span>
        </div>
        )
    }
}

export default Row