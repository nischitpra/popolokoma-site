import React,{Component} from 'react'
class NewsCard extends Component{
    openLink(link){
        window.open(link);
    }
    render(){
        return(
            <div className='news-card padding-container' onClick={()=>this.openLink(this.props.details.url)}>
                <div><img src={this.props.details.urlToImage} style={{maxWidth:'100%', maxHeight:'100%'}}/></div>
                <div className='card-body'>
                    <div className='card-title'>{this.props.details.title}</div>
                    <div className='card-subtext'>{`${this.props.details.source.name}, ${this.props.details.publishedAt}`}</div>
                </div>
            </div>
        )
    }
}
export default NewsCard