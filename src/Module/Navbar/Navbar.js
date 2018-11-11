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
            color: Color.primaryColorDarkOverlay,
        }
        const active={
            textDecoration:'none', 
            color: Color.accentColor,
            flex:'1',
            paddingLeft:'16px',
            paddingTop:'8px',
            paddingBottom:'8px',
            alignItems: 'center',
            textAlign: 'center',
        }
        const notified={
            textDecoration:'none', 
            color: '#ffffff',
            flex:'1',
            paddingLeft:'16px',
            paddingRight:'16px',
            paddingTop:'8px',
            paddingBottom:'8px',
            alignItems: 'center',
            textAlign: 'center',
            background: Color.green,
        }
        return(
            <div className={'navbar-container'}>
                <div className="mainnav flex" style={{background: Color.primaryColor}}><Link to={`/${string.navbar.url.home}`} style={this.presenter.getNavbar().currentTab===string.navbar.url.home?active:styl} onClick={()=>this.switchTab(string.navbar.url.home)} >{string.navbar.home}</Link></div>
                {/* <div className="mainnav flex" style={{background: Color.primaryColor}}><Link to={`/${string.navbar.url.coinList}`} style={this.presenter.getNavbar().currentTab===string.navbar.url.coinList?active:styl} onClick={()=>this.switchTab(string.navbar.url.coinList)} >{string.navbar.coinList}</Link></div> */}
                {/* <div className="mainnav flex" style={{background: Color.primaryColor}}><Link to={`/${string.navbar.url.feed}`} style={this.presenter.getNavbar().currentTab===string.navbar.url.feed?active:styl} onClick={()=>this.switchTab(string.navbar.url.feed)} >{string.navbar.feed}</Link></div> */}
                <div className="mainnav nav-getNotified"><Link to={`/${string.navbar.url.notify}`} style={notified} onClick={()=>this.switchTab(string.navbar.url.notify)} >{string.navbar.notify}</Link></div>
            </div>
        )
    }

}
export default Navbar