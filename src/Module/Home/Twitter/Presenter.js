import Interactor from "./Interactor";
import {id} from '../../../Values/Constants'
class Presenter{
    constructor(script){
        this.script=script
        this.interactor=new Interactor(this)
    }

    getClusterTweets(){
        this.interactor.getClusterTweets()
    }
    setClusterTweets(data){
        if(this.script!=undefined){
            var cluster={}
            var total=0
            var clusterTweets={}
            var color={}
            var col=0x263238
            const final_color=0xE53935
            const expand=[]

            for(var i in data){
                cluster[data[i].cluster]=cluster[data[i].cluster]==null?data[i].frequency:cluster[data[i].cluster]+data[i].frequency
                total+=data[i].frequency
                if(clusterTweets[data[i].cluster]==null){
                    clusterTweets[data[i].cluster]=[]
                }
                clusterTweets[data[i].cluster].push(data[i])
            }
            const clusterList=Object.values(cluster)
            const colorDiff=parseInt((final_color-col)/clusterList.length)

            for(var i in clusterList){
                col+=colorDiff
                color[i]=`#${col.toString(16)}`

                expand[i]=false
            }

            this.script.setState({
                cluster:clusterList,
                total:total,
                clusterTweets:Object.values(clusterTweets),
                color:Object.values(color),
                expand:expand,
            })
        }
    }

    stopLoading(){
        if(this.script!=undefined)
        this.script.setState({
            isLoading:false,
        })
    }
    setGoodBadTweets(data){
        if(this.script!=undefined)
        this.script.setState({
            data:data
        })
    }
}

export default Presenter