import React from 'react'

class Pie{
    constructor(ctx,center,startAngle,endAngle,radius,color,data){
        this.ctx=ctx
        this.center=center
        this.startAngle=startAngle
        this.endAngle=endAngle
        this.radius=radius   
        this.color=color
        this.data=data
    }
    isHover(x,y){
        return this.ctx.isPointInPath(x,y,this.defineShape())
    }
    defineShape(){
        this.ctx.beginPath()
        this.ctx.moveTo(this.center.x,this.center.y)        
        this.ctx.arc(this.center.x,this.center.y,this.radius,this.startAngle,this.endAngle)
        // this.ctx.lineTo(this.center.x, this.center.y)
        this.ctx.closePath()
    }

    render(x,y){
        this.defineShape()
        this.ctx.fillStyle=this.isHover(x,y)?"#ff0000":this.color
        this.ctx.fill()
        // this.ctx.strokeStyle=this.isHover(x,y)?"#ff0000":this.color
        // this.ctx.stroke()
        // const angle=(this.startAngle+this.endAngle)/2
        // const dist=this.radius*0.75
        // const text_width=this.ctx.measureText(this.data).width
        // this.ctx.fillStyle="#000000"
        // this.ctx.fillText(this.data,this.center.x-text_width/2+dist*Math.cos(angle),this.center.y+dist*Math.sin(angle))
    }
}

export default Pie