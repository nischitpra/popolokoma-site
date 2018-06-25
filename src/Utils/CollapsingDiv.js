import React,{Component} from 'react'

class CollapsingDiv extends Component{
    constructor(props){
        super(props)
        this.state={
            isCollapse:true,
            height:this.props.MinHeight==undefined?0:this.props.MinHeight,
            minHeight:this.props.MinHeight==undefined?0:this.props.MinHeight
        }
        this.handleToggle=this.handleToggle.bind(this)
    }
    componentDidMount(){
        
    }
    handleToggle(){
        this.setState({
            height:this.state.isCollapse?(this.container.clientHeight):this.state.minHeight,
            isCollapse:!this.state.isCollapse,
        })
    }
    render(){
        return(
            <div className='collapsing-div-container' onClick={ ()=>{ this.handleToggle() } }>
                <div style={{height:this.state.height, overflow:this.state.isCollapse?'auto':'hidden', transition:'1s'}} >
                    <div ref={container=>this.container=container}>{this.props.Content}</div>
                </div>
            </div>
        )
    }
}

export default CollapsingDiv