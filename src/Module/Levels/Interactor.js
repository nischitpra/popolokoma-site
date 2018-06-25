import {url} from '../../Network/URL'
import {id} from '../../Values/Constants'
class Interactor {
    presenter
    constructor(presenter){
        this.presenter=presenter
    }
    getLevels(from,to){
        fetch(url.api.cc.getLevels(from,to),{
			method: 'GET',
			headers: {
			  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
			  "Accept": 'application/json',
            }
        }).then(response=>{
            response.json().then(json=>{
                this.presenter.setLevels(json[id.message])
            })
        }).catch((error)=>{
            console.log(`error: ${JSON.stringify(error)}`)
        })
    }
}

export default Interactor