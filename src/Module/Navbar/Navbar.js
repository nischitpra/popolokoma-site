import React,{Component} from 'react'
import {string} from '../../Values/Constants'
import Presenter from './Presenter'
import { Link } from 'react-router-dom'
import { Color } from '../../Values/Color';

class Navbar extends Component{
    presenter = new Presenter(this)
    switchTab(tab){
        this.props.setNavbarTab(tab)
    }
    render(){
        const styl={
            textDecoration:'none', 
            color:'white',
            flex:'1',
            paddingLeft:'16px',
            paddingTop:'8px',
            paddingBottom:'8px',
            alignItems: 'center',
            textAlign: 'center',
        }
        const active={
            textDecoration:'none', 
            color: Color.primaryAccentColor,
            flex:'1',
            paddingLeft:'16px',
            paddingTop:'8px',
            paddingBottom:'8px',
            alignItems: 'center',
            textAlign: 'center',
        }
        return(
            <div className={'navbar-container'}>
                <div className="mainnav flex" style={{background: Color.primaryColor}}><Link to={`/${string.navbar.url.home}`} style={this.presenter.getNavbar().currentTab===string.navbar.url.home?active:styl} onClick={()=>this.switchTab(string.navbar.url.home)} >{string.navbar.home}</Link></div>
                <div className="mainnav flex" style={{background: Color.primaryColor}}><Link to={`/${string.navbar.url.coinList}`} style={this.presenter.getNavbar().currentTab===string.navbar.url.coinList?active:styl} onClick={()=>this.switchTab(string.navbar.url.coinList)} >{string.navbar.coinList}</Link></div>
                <div className="mainnav flex" style={{background: Color.primaryColor}}><Link to={`/${string.navbar.url.feed}`} style={this.presenter.getNavbar().currentTab===string.navbar.url.feed?active:styl} onClick={()=>this.switchTab(string.navbar.url.feed)} >{string.navbar.feed}</Link></div>
            </div>
        )
    }

}
export default Navbar