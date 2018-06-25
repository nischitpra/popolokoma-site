import React,{Component} from 'react'
import Pie from '../PieChart/Pie'

const color =require("../../Values/Color").Color

class PieChart extends Component{

    constructor(props){
        super(props)
        this.state={
            x:0,
            y:0,
            width:this.props.Width,
            height:this.props.Height,
            data:this.props.Data,
            total:this.props.Total,
            color:this.props.Color,
            isClick:false,
        }
        this.init=this.init.bind(this)
        this.handleClick=this.handleClick.bind(this)
        this.resetClick=this.resetClick.bind(this)
    }
    componentDidMount() {
        this.init()
        this.updateCanvas()
    }
    handleClick(){
        this.setState({
            isClick:true
        })
    }
    resetClick(index){
        this.props.handleClick(index)        
        this.setState({
            isClick:false
        })
    }
    init(){
        this.canvas=this.refs.canvas
        this.canvas.addEventListener("mousemove",(evt)=>{this.setState({x:evt.clientX-this.canvas.getBoundingClientRect().left,y:evt.clientY-this.canvas.getBoundingClientRect().top})});
        this.canvas.addEventListener("touchmove",(evt)=>{this.setState({x:evt.clientX-this.canvas.getBoundingClientRect().left,y:evt.clientY-this.canvas.getBoundingClientRect().top})});
        this.canvas.addEventListener("click",(evt)=>{this.handleClick()});
        this.ctx=this.canvas.getContext('2d');
        this.ctx.font = "1em Arial";
    }
    componentDidUpdate() {
        this.updateCanvas();
    }
    updateCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const ang=this.state.data
        var pTheta=0
        var theta=0
        for(var i=0;i<ang.length;i++){
            this.ctx.save()

            theta+=ang[i]/this.state.total * 2 * Math.PI
            const pie=new Pie(i,this.ctx,{x:this.state.width/2,y:this.state.height/2},pTheta,theta,this.state.width/2,this.state.color[i],i,this.state.isClick,this.resetClick)
            pie.render(this.state.x,this.state.y)
            pTheta=theta

            this.ctx.restore()
        }
    }

    render(){
        return(
            <canvas ref="canvas" width={this.state.width} height={this.state.height}/>
        )
    }
}

export default PieChart