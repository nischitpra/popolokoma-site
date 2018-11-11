import React, { Component } from 'react'
import {id,string} from '../../Values/Constants'


class GetNotified extends Component{
    constructor(props){
        super(props)
        this.props.setNavbarTab(string.navbar.url.notify)
    }
    render(){
        return(
            <div className='getnotified-container'>
                <div> Subscribe and get notified of the latest trends in the market.</div>
                <div className='getnotified-input-container'>
                    <input className='getnotified-input-email' placeholder='Email' type='email'/>
                    <div className='getnotified-verify-button' >Verify</div>
                </div>
            </div>
        )
    }

}


export default GetNotified