import {url} from '../../../Network/URL'
import {id,string,value} from '../../../Values/Constants'
import socketIOClient from 'socket.io-client'

class Interactor{
    presenter
    constructor(presenter){
        this.presenter=presenter
        this.subsList=[]
    }
    getSocketSubscriptionList(from,to){
        fetch(url.api.socketSubsList(from,to),string.api.getHeader)
        .then(response=>{
            response.json().then((json)=>{
                this.socket = socketIOClient(url.api.cryptocompareWebSocket)
                this.subsList=json[id.message]
                console.log(JSON.stringify(this.subsList))
                this.connect(from,to)
            })
        })
    }
    connect(from,to){
        console.log('inside connect')
        this.socket.on('connect',(data)=>{
            console.log("connection has been made to socket")
            this.socket.emit(id.cryptoCompare.clientEvent,  { [id.cryptoCompare.from]: from,[id.cryptoCompare.to]:to })
        })
        this.socket.on('error',(error)=>console.log("some error occured: "+error))
        this.socket.on([id.cryptoCompare.serverEvent], (currentData)=>{
        // if(this.lastUpdate===undefined||this.lastUpdate+value.subscriptionRefreshRate<new Date().getTime()){
            const data=currentData.split("~")
            // console.log(`Trading Data:${JSON.stringify(data)}`)
            this.presenter.setCurrentTrade(data)

            // this.lastUpdate=new Date().getTime()
        // }
        });
    }
    subscribe(from,to){
        this.getSocketSubscriptionList(from,to)
        console.log('subscribed')
    }
    unsubscribe(from,to){
        console.log('tryoing to unsubscribe')
        if(this.socket!==undefined){
            this.socket.emit(id.cryptoCompare.clientEvent,  {
                [id.cryptoCompare.from]: from,
                [id.cryptoCompare.to]:to,
                [id.cryptoCompare.unsubscribe]:value.cryptoCompare.unsubscribe
            })
            // this.socket=undefined
        }
        this.subsList=[]
        console.log('unsubscribed')
    }
    
}

export default Interactor