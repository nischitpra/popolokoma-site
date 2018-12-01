import {id,value} from '../../Values/Constants'
import {url} from '../../Network/URL'

class Interactor{
    constructor(presenter){
        this.presenter=presenter

        const ws = new WebSocket(url.own.ws_strategyFilter);
        
        ws.onmessage = function message(evt){
            const data = JSON.parse ( evt.data )

            if ( data.length > 0 ){
                /*
                imcoming data format
                [
                    { 
                        name : "three black crow" , 
                        data : [
                            {
                                from : btc,
                                to : xrp,
                                time : 1m,
                                data : []
                            }
                        ] 
                    },
                    {
                        name : "double top",
                        data : [
                            {
                                from : eth,
                                to : btc,
                                time : 4h,
                                data : [],
                            }
                        ]
                    }
                ]
                */
                var dataList = []
                for ( var i in data ){
                    var strategy = data[ i ]
                    dataList.push({
                        name : strategy.name,
                        pairs : []
                    })
                    for ( var j in strategy.data){
                        var _item = strategy.data[ j ]
                        var inIndex = -1
                        for ( var k = 0; k < dataList[ dataList.length - 1 ].pairs.length; k++ ){
                            var _dl_item = dataList[ dataList.length - 1 ].pairs[ k ]
                            if ( _item.from == _dl_item.from
                                && _item.to == _dl_item.to ){
                                inIndex = k
                                break
                            }
                        }
                        if ( inIndex == -1 ){
                            dataList[ dataList.length - 1 ].pairs.push({
                                from : _item.from,
                                to : _item.to,
                                window : [],
                            })
                            inIndex = dataList[ dataList.length - 1 ].pairs.length - 1
                        }
                        dataList[ dataList.length - 1 ].pairs[ inIndex ].window.push ( _item.time ) 
                        dataList[ dataList.length - 1 ].pairs[ inIndex ][ _item.time ] = _item.data 
                    }
                }

                const len = presenter.script.strategyData
                presenter.setStrategyData ( dataList )
                if ( len == 0 ){
                    presenter.setSelectedKey ( 
                        dataList[0].name, 
                        dataList[0].pairs[0].from, 
                        dataList[0].pairs[0].to, 
                        dataList[0].pairs[0].window,
                        dataList[0].pairs[0] 
                    ) 
                }
            }else{
                presenter.setStrategyData ( [] )
                presenter.setSelectedKey ( "", "", "", [], {} )
            }
        }
    }
}
export default Interactor
