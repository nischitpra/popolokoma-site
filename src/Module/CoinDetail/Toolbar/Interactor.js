
import {url} from '../../../Network/URL'
import {id} from '../../../Values/Constants'
import {value} from '../../../Values/Constants'
import Prefs from "../../../Prefs";
class Interactor{
    presenter
    constructor(presenter){
        this.presenter=presenter
    }
    setToolbarOptions(toolbar){
        Prefs.setCandleStickToolbar(toolbar)
    }
    getToolbarOptions(){
        return Prefs.getCandleStickToolbar()
    }

    setSubToolbar(subToolbar){
        Prefs.setSubToolbar(subToolbar)
    }
    getSubToolbar(){
        return Prefs.getSubToolbar()
    }
    setSMAToolbar(fast,medium,slow){
        Prefs.setSMAToolbar(fast,medium,slow)
    }
    getSMAToolbar(){
        return Prefs.getSMAToolbar()
    }
    setEMAToolbar(fast,medium,slow){
        Prefs.setEMAToolbar(fast,medium,slow)
    }
    getEMAToolbar(){
        return Prefs.getEMAToolbar()
    }
    setARTToolbar(atr){
        Prefs.setARTToolbar(atr)
    }
    getATRToolbar(){
        return Prefs.getATRToolbar()
    }
    setElderRayToolbar(elderRay){
        Prefs.setElderRayToolbar(elderRay)
    }
    getElderRayToolbar(){
        return Prefs.getElderRayToolbar()
    }
    setMACDToolbar(fast,slow,signal){
        Prefs.setMACDToolbar(fast,slow,signal)
    }
    getMACDToolbar(){
        return Prefs.getMACDToolbar()
    }
    setRSIToolbar(rsi){
        Prefs.setRSIToolbar(rsi)
    }
    getRSIToolbar(){
        return Prefs.getRSIToolbar()
    }
    setSTOToolbar(windowSize,kWindowSize,dWindowSize){
        Prefs.setSTOToolbar(windowSize,kWindowSize,dWindowSize)
    }
    getSTOToolbar(){
        return Prefs.getSTOToolbar()
    }
    setSubToolbarOpen(value){
        Prefs.setSubToolbarOpen(value)
    }
    getSubToolbarOpen(){
        return Prefs.getSubToolbarOpen()
    }
    getIsSubscribed(email,from,to){
        console.log(url.api.isSubscribed(email,from,to))
        fetch(url.api.isSubscribed(email,from,to),{
			method: 'GET',
			headers: {
			  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
			  "Accept": 'application/json',
            }
        }).then(response=>{
            if(response.ok){
                response.json().then(json=>{
                    if(json[id.status]===value.status.ok){
                        this.presenter.setIsSubscribed(json[id.message])
                    }
                })
            }
        }).catch(error=>{
            console.log(`error: ${error}`)
        })
    }
    submitOTP(email,from,to,otp,callback){
        console.log(url.api.subscribeOtp(email,from,to,otp))
        fetch(url.api.subscribeOtp(email,from,to,otp),{
			method: 'GET',
			headers: {
			  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
			  "Accept": 'application/json',
            }
        }).then(response=>{
            if(response.ok){
                response.json().then(json=>{
                    if(json[id.status]===value.status.ok){
                        // alert(json[id.message])
                        this.presenter.refreshPage()
                        if(callback!==undefined){
                            callback(email)
                        }
                    }else{
                        alert(json[id.message])
                    }
                })
            }
        }).catch(error=>{
            console.log(`error: ${error}`)
        })
    }
    subscribe(email,from,to,callback){
        console.log(url.api.subscribe(email,from,to))
        fetch(url.api.subscribe(email,from,to),{
			method: 'GET',
			headers: {
			  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
			  "Accept": 'application/json',
            }
        }).then(response=>{
            if(response.ok){
                response.json().then(json=>{
                    if(json[id.status]===value.status.ok){
                        this.presenter.refreshPage()
                        alert(json[id.message])
                        if(callback!==undefined){
                            callback(true)
                        }
                    }else{
                        alert(json[id.message])
                        if(callback!==undefined){
                            callback(false)
                        }
                    }
                })
            }
        }).catch(error=>{
            console.log(`error: ${error}`)
            if(callback!==undefined){
                callback(false)
            }
        })
    }
    unsubscribe(email,from,to){
        console.log(url.api.unsubscribe(email,from,to))
        fetch(url.api.unsubscribe(email,from,to),{
			method: 'GET',
			headers: {
			  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
			  "Accept": 'application/json',
            }
        }).then(response=>{
            if(response.ok){
                response.json().then(json=>{
                    if(json[id.status]===value.status.ok){
                        this.presenter.refreshPage()
                    }else{
                        alert(json[id.message])
                    }
                })
            }
        }).catch(error=>{
            console.log(`error: ${error}`)
        })
    }

    setEmail(email){
        Prefs.setEmail(email)
    }
    getEmail(){
        return Prefs.getEmail()
    }
}

export default Interactor