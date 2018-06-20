import React,{Component} from 'react'
import Loading from '../Loading/Loading'
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
        }
        this.init=this.init.bind(this)
    }
    componentDidMount() {
        this.init()
        this.updateCanvas()
    }
    init(){
        this.canvas=this.refs.canvas
        this.canvas.addEventListener("mousemove",(evt)=>{this.setState({x:evt.clientX-this.canvas.getBoundingClientRect().left,y:evt.clientY-this.canvas.getBoundingClientRect().top})});
        this.canvas.addEventListener("touchmove",(evt)=>{this.setState({x:evt.clientX-this.canvas.getBoundingClientRect().left,y:evt.clientY-this.canvas.getBoundingClientRect().top})});
        this.ctx=this.canvas.getContext('2d');
        this.ctx.font = "1em Arial";
    }
    componentDidUpdate() {
        this.updateCanvas();
    }
    updateCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const ang=this.state.data
        var col=0xff0000
        var pTheta=0
        var theta=pTheta
        for(var i=0;i<ang.length;i++){
            theta+=ang[i]/this.state.total * 2 * Math.PI
            col+=0x002222
            const pie=new Pie(this.ctx,{x:this.state.width/2,y:this.state.height/2},pTheta,theta,this.state.width/2,`#${col.toString(16)}`,i)
            pie.render(this.state.x,this.state.y)
            pTheta=theta
        }
    }

    render(){
        return(
            <canvas ref="canvas" width={this.state.width} height={this.state.height}/>
        )
    }
}

export default PieChart