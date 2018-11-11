import React,{Component} from 'react'
import { timeFormat } from "d3-time-format"

class NewsStripCard extends Component{
    constructor(props){
        super(props)
        this.format=timeFormat("%_d %b, %_I:%M %p")
    }
    openLink(link){
        window.open(link);
    }
    render(){
        return(
            <div className='newsStripCard-container' onClick={()=>this.openLink(this.props.details.url)}>
                <div className='leftPanel'><img className={'image'} src={this.props.details.urlToImage} /></div>
                <div className='rightPanel'>
                    <div className='newsStripCard-title'>{this.props.details.title}</div>
                    <div className='newsStripCart-subtext'>{`${this.format(new Date(this.props.details.publishedAt))} - ${this.props.details.source.name}`}</div>
                </div>
            </div>
        )
    }
}
export default NewsStripCard