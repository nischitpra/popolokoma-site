import React,{Component} from 'react'
import {url} from '../../../../Network/URL'
import {value} from '../../../../Values/Constants'
import { timeFormat } from "d3-time-format"


class TweetBlock extends Component{
    constructor(props){
        super(props)
        this.format=timeFormat("%_d %b, %_I:%M %p")
    }
    redirectAccount(postId){
        window.open(url.api.twitter.userTimeline(postId))
    }

    render(){
        

        return(
            <div className='tweet-container' >
                <div className='tweet-time'>
                    {this.format(new Date(this.props.data.created_at))}
                    <br/>
                    RT - {this.props.data.frequency}
                </div>
                <div className='tweet-text' onClick={()=>this.redirectAccount(this.props.data.id_str)}>
                    {this.props.data.text}
                </div>
            </div>
        )
    }
}

export default TweetBlock