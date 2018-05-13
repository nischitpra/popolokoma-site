import React, {Component} from 'react'
import {string} from '../../Values/Constants'
class Loading extends Component{
    constructor(props){
        super(props)
        this.state={
            isLoading:true,
        }
    }
    componentWillMount(){
        if(this.props.isLoading!=undefined){
            this.setState({isLoading:this.props.isLoading})
        }
    }
    componentWillReceiveProps(newProps){
        this.setState({
            isLoading:newProps.isLoading,
        })
    }
    render(){
        const message=this.props.showMessage===undefined?string.dataEmpty:this.props.showMessage
        if(this.state.isLoading){
            return(<div className='loading-container'><div className='loading'/></div>)
        }
        if(this.props.data!=undefined && this.props.data.length===0){
            return(<div className={'div-center no-content'}>{message}</div>)
        }
        return(<div/>)
        
    }
}

export default Loading