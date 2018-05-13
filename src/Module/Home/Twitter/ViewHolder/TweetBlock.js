import React,{Component} from 'react'
import {url} from '../../../../Network/URL'
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
            <div className='tweet-container padding-container' onClick={()=>this.redirectAccount(this.props.data.id_str)}>
                <div className='flex-container'>
                    <div className={'left-panel'} style={{flex:0}}><img className={'tweet-image'} src={this.props.data.profile_image_url} /></div>
                    <div className={'reft-panel'} style={{marginLeft:6}}>
                        <div className='tweet-title'>{this.props.data.name} </div>
                        <div className='tweet-subtext'>{`@${this.props.data.screen_name} ⋅ ${this.format(new Date(this.props.data.created_at))}`}</div>
                    </div>
                </div>
                <div className='tweet-description'>{this.props.data.text}</div>
            </div>
        )
    }
}

export default TweetBlock