import React, { Component } from 'react'
// import './App.css'
import Home from './Module/Home/Home'
import CoinDetail from './Module/CoinDetail/CoinDetail'
import CoinList from './Module/CoinList/CoinList'
import Feed from './Module/Feed/Feed'
import Navbar from './Module/Navbar/Navbar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Presenter from './Presenter'
import {string} from './Values/Constants'
import { Link } from 'react-router-dom'


class App extends Component {
  presenter=new Presenter(this)
  constructor(props){
    super(props)
    this.state={
      refreshPage:false,
    }
    this.setNavbarTab=this.setNavbarTab.bind(this)
    this.presenter.init()
  }
  componentDidMount(){
    document.title=string.projectName
  }
  componentWillUnmount(){
    this.presenter.script=undefined
  }
  setNavbarTab(tab){
    this.presenter.setNavbarTab({currentTab:tab})
    this.setState({refreshPage:!this.state.refreshPage})
  }
  render() {
    return (
      <Router>
        <div className='App' style={{height:'100%'}} >
          <div className='background'/>
          <div className='main-navbar-container' ref={navbar=>this.navbar=navbar}>
            {/* <div className='App-title'><Link to={`/${string.navbar.url.home}`} style={{textDecoration:'none', color:'white'}}>{string.projectName}</Link></div> */}
            <Navbar setNavbarTab={this.setNavbarTab}/>
          </div>
          <div className={'main-body'}>
              <Switch>
                <Route exact path='/' render={(props)=>(<Home setNavbarTab={this.setNavbarTab}/>)}/>
                <Route exact path={`/${string.navbar.url.favourites}&f=:coin&t=:tab`} render={(props)=>(<CoinDetail from={props.match.params.coin} to={props.match.params.tab}/>)}/> 
                <Route exact path='/coinList' render={(props)=>(<CoinList setNavbarTab={this.setNavbarTab}/>)}/>
                <Route exact path='/feed' render={(props)=>(<Feed setNavbarTab={this.setNavbarTab}/>)}/>
                <Route path='*' component={NotFound} />
              </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const NotFound = () => (
  <h1>404.. Woops, Nothing here to see!</h1>)

export default App;
