import React,{Component} from 'react'
import {string} from '../../Values/Constants'
import Presenter from './Presenter'
import { Link } from 'react-router-dom'

class Navbar extends Component{
    presenter = new Presenter(this)
    switchTab(tab){
        this.props.setNavbarTab(tab)
    }
    render(){
        const styl={
            textDecoration:'none', 
            color:'white',
            paddingLeft:'16px', 
            paddingRight:'16px', 
            paddingTop:'6px', 
            paddingBottom:'6px', 
            height:'25px', 
            fontSize:'0.8em', 
            display:'flex', 
            alignItems:'center',
            
        }
        return(
            <span className={'navbar-container padding-horizontal-container'}>
                <span><Link to={`/${string.navbar.url.home}`} style={styl} className={this.presenter.getNavbar().currentTab===string.navbar.url.home?'mainnav active':'mainnav'} onClick={()=>this.switchTab(string.navbar.url.home)} >{string.navbar.home}</Link></span>
                <span><Link to={`/${string.navbar.url.coinList}`} style={styl} className={this.presenter.getNavbar().currentTab===string.navbar.url.coinList?'mainnav active':'mainnav'} onClick={()=>this.switchTab(string.navbar.url.coinList)} >{string.navbar.coinList}</Link></span>
            </span>
        )
    }

}
export default Navbar