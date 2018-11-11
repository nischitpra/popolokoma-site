import {id,value} from '../../Values/Constants'
import {url} from '../../Network/URL'

class Interactor{
    constructor(presenter){
        this.presenter=presenter
        const WebSocket = require('ws');
        this.ws = new WebSocket(url.own.ws_strategyFilter);
        
        ws.on('open',() => {
            console.log('strategy filter websocket connection opened')
        });
        
        ws.on('message', data => {
            var strategyData=[];
            for(var strategy in data){
                var stratData={
                    name:strategy.name,
                    pairs:{},
                }
                for(var _item in strategy.data){
                    stratData.pairs[_item.from][_item.to][window].push(_item.time)
                    stratData.pairs[_item.from][_item.to][pchange] = "0"
                    stratData.pairs[_item.from][_item.to][_item.time] = _item.data
                }
                strategyData.push(stratData)
            }

            this.presenter.setStrategyData(strategyData)
            this.presenter.setSelectedKey(strategyData[0].name ,strategyData[0].pairs[0].from,strategyData[0].pairs[0].to,strategyData[0].pairs[0].window)
        });
    }
    getStrategyData(){
        var strategyData=[
            {name:"Double Top", pairs:[
                {from:"BTC",to:"USD",pchange:"2.5",window:["1m","1h","1d"]},
                {from:"ETH",to:"USD",pchange:"-0.15",window:["1m","1h","2d"]},
                {from:"LTC",to:"USD",pchange:"0",window:["1m","1h","3d"]}, 
                ]
            },
            {name:"Three Black Crows", pairs:[
                {from:"XRP",to:"USD",pchange:"1.32",window:["1m","1h","4d"]},
                {from:"XVG",to:"USD",pchange:"0",window:["1m","1h","5d"]},
                {from:"XEM",to:"USD",pchange:"-5.87",window:["1m","1h","6d"]}, 
                ]
            },
        ]
        this.presenter.setStrategyData(strategyData)
        this.presenter.setSelectedKey(strategyData[0].name ,strategyData[0].pairs[0].from,strategyData[0].pairs[0].to,strategyData[0].pairs[0].window)
    }
    getChartData(from,to,window){
        var json=[[1538909640000,6556.5,6556.3,6556.5,6556.3,2.24139782], [1538909580000,6556.9,6556.9,6557,6556.9,4.12155142], [1538909520000,6556.9,6556.9,6556.9,6556.9,0.01283675], [1538909460000,6557,6557,6557,6557,0.08238854], [1538909400000,6556.9,6557,6557,6556.9,0.13566075], [1538909340000,6556.9,6557,6557,6556.9,0.56076357], [1538909280000,6557,6557,6557,6557,0.0198], [1538909220000,6563.6,6557,6563.6,6556.4,7.16935593], [1538909160000,6563.6,6563.7,6563.7,6563.6,2.003], [1538909100000,6567.62383049,6563.67465059,6567.62383049,6563.67465059,2.16849001], [1538909040000,6567.6,6567.6,6567.7,6567.6,0.9775318], [1538908980000,6567.6,6567.7,6567.7,6567.6,0.27459704], [1538908920000,6567.62383049,6567.62383049,6567.62383049,6567.62383049,0.006], [1538908860000,6567.6,6567.7,6567.7,6567.6,0.3482], [1538908800000,6567.6,6567.62383049,6567.62383049,6567.6,0.431611], [1538908740000,6567.85452031,6567.62383049,6567.9,6567.6,2.53261895], [1538908680000,6567.8,6567.8,6567.9,6567.8,0.843], [1538908620000,6567.7,6567.9,6567.9,6567.6,0.29763702], [1538908560000,6567.7,6567.7,6567.7,6567.7,1.82557062], [1538908500000,6567.7,6567.8,6567.8,6567.5,1.48783039], [1538908440000,6567.3,6567.8,6567.8,6567.1,1.87915422], [1538908380000,6566.018515,6566.8,6566.8,6566.018515,4.77320894], [1538908320000,6565.90505095,6566.1,6567.8,6565.90505095,8.80495085], [1538908260000,6565.7,6566,6566,6565.7,1.07903076], [1538908200000,6565.7,6565.7,6565.8,6565.7,0.04924095], [1538908140000,6565.8,6565.7,6565.8,6565.7,2.03514668], [1538908080000,6564.9,6565.8,6569,6564.9,2.85105412], [1538908020000,6564.85555265,6564.85555265,6564.85555265,6564.85555265,0.003], [1538907960000,6564.85555265,6564.85555265,6564.9,6564.85555265,1.23345942], [1538907900000,6564.9,6564.85555265,6568.9,6564.85555265,9.88947858], [1538907840000,6564.9,6564.85555265,6564.9,6564.85555265,0.02868187], [1538907780000,6564.4,6564.9,6564.9,6564.4,0.89187457], [1538907720000,6564,6564.4,6564.4,6564,0.506], [1538907660000,6563.93279337,6564,6564,6563.93279337,2.15321085], [1538907600000,6562.8,6563.93279337,6564.9,6562.8,2.37595618]]
        this.presenter.setChartData(json)
        this.presenter.stopLoading();
       
       
        // this.presenter.startLoading();
        // fetch(url.api.exchange.candles(from,to,window),{
		// 	method: 'GET',
		// 	headers: {
        //         "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
        //         "Accept": 'application/json',
        //     }
        // }).then(response=>{
        //     if(response.ok){
        //         response.json().then(json=>{
        //             this.presenter.stopLoading();
        //             this.presenter.setChartData(json)
        //         })
        //     }
        // }).catch(error=>{
        //     console.log(`error: ${error}`)
        // })
    }
}
export default Interactor