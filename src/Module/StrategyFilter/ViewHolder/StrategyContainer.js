import React, {Component} from 'react'
import Row from './Row'
import CollapsingDiv from '../../../Utils/CollapsingDiv';
class StrategyContainer extends Component{
    constructor(props){
        super(props)
    }
    setSelection(from,to,window){
        this.props.setSelection(this.props.data.name,from,to,window)
    }
    render(){
        return(
        <CollapsingDiv Title={this.props.data.name} Content={this.props.data.pairs.map(
            (item)=><Row from={item.from} to={item.to} pchange={item.pchange} window={item.window} isSelected={`${item.from}_${item.to}`==`${this.props.selectedKey.from}_${this.props.selectedKey.to}`} setSelection={(from,to,window)=>this.setSelection(from,to,window)}/>)}/>
        )
    }
}

export default StrategyContainer