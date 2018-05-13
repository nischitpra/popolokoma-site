import {url} from '../../../Network/URL'
import {id,value} from '../../../Values/Constants' 
class Interactor{
    constructor(presenter){
        this.presenter=presenter
    }

    getNews(type,count,page){
        console.log('getting home news')
        fetch(url.api.news(type,count,page),{
            method: 'GET',
			headers: {
			  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:57.0) Gecko/20100101 Firefox/57.0",
              "Accept": 'application/json',
              "X-API-Key": value.newsApiKey
            }
        }).then(response=>{
            this.presenter.stopLoading()
            if(response.ok){
                response.json().then(json=>{
                    this.presenter.setNews(json[id.message])
                })
            }
        }).catch(error=>{
            this.presenter.stopLoading()
        })
    }


}

export default Interactor