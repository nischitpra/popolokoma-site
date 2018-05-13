import React,{Component} from 'react'
class NewsStripCard extends Component{
    openLink(link){
        window.open(link);
    }
    render(){
        return(
            <div className='newsStripCard' onClick={()=>this.openLink(this.props.details.url)}>
                <div className={'leftPanel'} style={{flex:0}}><img className={'image'} src={this.props.details.urlToImage} /></div>
                <div className={'rightPanel'} style={{flex:1}}>
                    <div className='stripCard-title'>{this.props.details.title}</div>
                    <div className='cardSubtext'>{`${this.props.details.source.name}, ${this.props.details.publishedAt}`}</div>
                    {/* <div className='cardDescription'>{this.props.details.description}</div> */}
                </div>
                {/* <div className='readMore'>{string.readFullArticle}</div> */}
            </div>
        )
    }
}
export default NewsStripCard