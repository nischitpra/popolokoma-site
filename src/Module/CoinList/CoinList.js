import React,{Component} from 'react'
import Loading from '../Loading/Loading'
import "react-table/react-table.css"
import ReactTable from "react-table"
import {id,string,array} from '../../Values/Constants'
import Presenter from './Presenter'
import matchSorter from 'match-sorter'
import {Redirect} from 'react-router-dom'


const color =require("../../Values/Color").Color

class CoinList extends Component{
    presenter=new Presenter(this)
    constructor(props){
        super(props)
        this.state={
            coinList:{
                [string.mine]:[],
                [string.btc]:[],
                [string.eth]:[],
                [string.bnb]:[],
                [string.usdt]:[],
            },
            selectedCoinList:this.presenter.getFavouritesList(),
            selectedCoinDetailList:this.presenter.getFavouritesDetailList(),
            isLoading:true,
            currentTab:string.mine,
            redirect:null,
            interval:null,
        }
        this.props.setNavbarTab(string.navbar.url.coinList)
        this.changeTab=this.changeTab.bind(this)
    }
    componentDidMount(){
        this.presenter.init(1000*10)
    }
    componentWillUnmount(){
        clearInterval(this.state.interval)
    }
    selectItem(key,from,to){
        var selectedCoinList=this.state.selectedCoinList
        var selectedCoinDetailList=this.state.selectedCoinDetailList
        const index = selectedCoinList.indexOf(key)
        if(index>-1){
            selectedCoinList.splice(index,1)
            selectedCoinDetailList.splice(index,1)
        }else{
            selectedCoinList.push(key)
            selectedCoinDetailList.push({[id.coinList.from]:from,[id.coinList.to]:to})
        }
        this.setState({
            selectedCoinList:selectedCoinList,
            selectedCoinDetailList:selectedCoinDetailList,
        })
        this.presenter.addCoinListToFavourites(selectedCoinList)
        this.presenter.setFavouritesDetailList(selectedCoinDetailList)
    }
    changeTab(tab){
		this.setState({currentTab:tab})
	}
    loadPage(key){
        const len = key.length
        var from=key.substring(0,len-3)
        var to=key.substring(len-3,len)
        if(key===string.usdt){
            from=key.substring(0,len-4)
            to=key.substring(len-4,len)
        }
		this.setState({
			redirect:<Redirect to={`/${string.navbar.url.favourites}&f=${from}&t=${to}`}/>
		})
    }
    
    render(){
        if(this.state.redirect!=null) return(this.state.redirect)

        const column=[
            {Header: 'Symbol', accessor:'symbol', filterMethod: (filter, rows) =>matchSorter(rows, filter.value, { keys: ["symbol"] }),filterAll: true},
            {Header: 'Price', accessor:'weightedAvgPrice'},
            {Header: 'High', accessor:'highPrice'},
            {Header: 'Low', accessor:'lowPrice'},
            {Header: 'Volume', accessor:'volume'},
            {Header: 'P', accessor:'priceChange'},
            {Header: '%', accessor:'priceChangePercent'},
        ]
        const showEmptyMessage=this.presenter.getFavouritesList().length==0?string.favourites.isEmpty:''
        const exchageFromList=array.ExchangeFromList.map(
			(item,index)=><span key={index} className={this.state.currentTab===item?'active nav-tool':'nav-tool'} onClick={()=>this.changeTab(item)}>{item}</span>
		)
        var data=this.state.coinList[this.state.currentTab]
        if(data==undefined){ data=[]}
        const loader=this.state.isLoading?<div><Loading data={[]} isLoading={this.state.isLoading}/></div>:''
        return(
        <div>
            <div>
                <div className={'toolbar navbar-container  favourites-toolbar-margin'}>
                    {exchageFromList}
                </div>
            </div>
            <div className='padding-container margin-top'>
                {loader}
                <ReactTable data={data} columns={column} pageSize={data.length>100?100:data.length} className="-striped -highlight" 
                showPageSizeOptions={false}
                getTrProps={(state, rowInfo, column) => {
                    if(rowInfo==null) return{}
                    return {
                        onClick: (e) => {
                            if(this.state.currentTab==string.mine){
                                this.loadPage(rowInfo.original.symbol)
                            }else{
                                this.selectItem(id.key.from_to(rowInfo.original.symbol,this.state.currentTab),rowInfo.original.symbol,this.state.currentTab)
                            }
                        },style:{
                            backgroundColor: this.state.selectedCoinList.indexOf(id.key.from_to(rowInfo.original.symbol,this.state.currentTab))>-1 ? color.blue : rowInfo.original.priceChange>0 ? color.green_translucent : rowInfo.original.priceChange<0 ? color.red_translucent : ''
                        }
                    }
                }}
                filterable={true}/>
            </div>
        </div>
        )
    }
}
            

export default CoinList