import React, {Component} from 'react'
import {string,id, value} from '../../../Values/Constants'
import Presenter from './Presenter'
import {Collapse} from 'react-collapse'
import Loading from '../../Loading/Loading'


class Toolbar extends Component{
    presenter=new Presenter(this)
    constructor(props){
        super(props)
        this.state={
            toolbar:this.presenter.getToolbarOptions(),
            openSubToolbar:this.presenter.getSubToolbarOpen(),
            isSubscribed:false,
            openSubscribeForm:false,
        }
        this.setEmailSubscription=this.setEmailSubscription.bind(this)
        this.toggleCollapseToolbar=this.toggleCollapseToolbar.bind(this)
    }
    componentDidMount(){
        this.presenter.getIsSubscribed(this.presenter.getEmail(),this.props.from,this.props.to)
    }
    componentWillReceiveProps(){
        this.presenter.getIsSubscribed(this.presenter.getEmail(),this.props.from,this.props.to)
    }
    componentWillUnmount(){
        this.presenter.script=undefined
    }
    getHistoryType(){
        const type=this.state.toolbar.historyType[`${this.props.from}_${this.props.to}`]
        if(type===undefined|| type===null){
            return id.binance.candle_interval._1h
        }
        return type
    }
    toggleCollapseToolbar(){
        const value=!this.state.openSubToolbar
        this.setState({
            openSubToolbar:value,
        })
        this.presenter.setSubToolbarOpen(value)
    }
    toggle(_id){
        var toolbar=this.state.toolbar
        switch(_id){
            case id.areaChart:
                toolbar.areaChart=!toolbar.areaChart
                break
            case id.volumeBar:
                toolbar.volumeBar=!toolbar.volumeBar
                break
            case id.sma:
                toolbar.sma=!toolbar.sma
                break
            case id.ema:
                toolbar.ema=!toolbar.ema
                break
            case id.macd:
                toolbar.macd=!toolbar.macd
                break
            case id.rsi:
                toolbar.rsi=!toolbar.rsi
                break
            case id.atr:
                toolbar.atr=!toolbar.atr
                break
            case id.stochasticOscillator:
                toolbar.stochasticOscillator=!toolbar.stochasticOscillator
                break
            case id.elderRay:
                toolbar.elderRay=!toolbar.elderRay
                break
            case id.parabolicSAR:
                toolbar.parabolicSAR=!toolbar.parabolicSAR
                break
            case id.bollingerBand:
                toolbar.bollingerBand=!toolbar.bollingerBand
                break
            case id.horizontalLine:
                toolbar.horizontalLine=!toolbar.horizontalLine
                break
            default:
                break
        }
        this.presenter.setToolbarOptions(toolbar)
        this.props.refreshPage()
    }
    switchHistory(hist){
        var toolbar=this.state.toolbar
        toolbar.historyType[[`${this.props.from}_${this.props.to}`]]=hist
        this.presenter.setToolbarOptions(toolbar)
        this.props.refreshPage()
    }
    getSubToolbar(){
        var subToolbar=[]
        if(this.state.toolbar.sma){
            subToolbar.push(<SmaToolbar presenter={this.presenter}/>)
        }
        if(this.state.toolbar.ema){
            subToolbar.push(<EmaToolbar presenter={this.presenter}/>)
        }
        if(this.state.toolbar.macd){
            subToolbar.push(<MacdToolbar presenter={this.presenter}/>)
        }
        if(this.state.toolbar.rsi){
            subToolbar.push(<RsiToolbar presenter={this.presenter}/>)
        }
        if(this.state.toolbar.atr){
            subToolbar.push(<AtrToolbar presenter={this.presenter}/>)
        }
        if(this.state.toolbar.stochasticOscillator){
            subToolbar.push(<StoToolbar presenter={this.presenter}/>)
        }
        if(this.state.toolbar.elderRay){
            subToolbar.push(<ElderRayToolbar presenter={this.presenter}/>)
        }
        return subToolbar
    }

    subscribeButtonClick(){
        if(this.state.isSubscribed){
            this.presenter.unsubscribe(this.presenter.getEmail(),this.props.from,this.props.to)
        }else{
            this.setState({openSubscribeForm:true})
        }
    }
    setEmailSubscription(email){
        this.setState({
            openSubscribeForm:false,
        })
        this.props.refreshPage()
    }


    render(){
        const subToolbarList=this.getSubToolbar()
        const subToolbar=<Collapse isOpened={this.state.openSubToolbar} springConfig={{stiffness: 100, damping: 20}}><div>{subToolbarList}</div></Collapse>
        const toggleSubToolbar=subToolbarList.length===0?'':this.state.openSubToolbar?<div className='toggleOn text-center' onClick={()=>this.toggleCollapseToolbar()}>{string.toggleOn}</div>:<div className='toggleOff text-center' onClick={this.toggleCollapseToolbar}>{string.toggleOff}</div>
        // const subscribe=this.state.isSubscribed?<span className='unsubscribe' onClick={this.subscribeButtonClick.bind(this)}>{string.changeStick.subscribed}</span>:<span className='subscribe' onClick={this.subscribeButtonClick.bind(this)}>{string.changeStick.notSubscribed}</span>
        const subscribe=this.state.isSubscribed?<i className="material-icons md-18 unsubscribe" onClick={this.subscribeButtonClick.bind(this)}>notifications</i>:<i className="material-icons md-18 subscribe" onClick={this.subscribeButtonClick.bind(this)}>notifications</i>
        const showSubscriptionForm=<Collapse isOpened={this.state.openSubscribeForm} springConfig={{stiffness: 100, damping: 20}}><SubscriptionForm presenter={this.presenter} from={this.props.from} to={this.props.to} setEmailSubscription={this.setEmailSubscription}/></Collapse>
        
        // const trendLine=value.isMobile?"":<span className={this.state.toolbar.horizontalLine?'expand-x':'collapse-x'} ><LineToolbar presenter={this.presenter} handleTrendLine={this.props.handleTrendLine} handleTrendLineId={this.props.handleTrendLineId}/></span>
        const trendLine=value.isMobile?"":<span className = "nav-tool"><LineToolbar presenter={this.presenter} handleTrendLine={this.props.handleTrendLine} handleTrendLineId={this.props.handleTrendLineId}/></span>
        
        
        return(
            <div>
                <div className='title-toolbar'>
                    <div className='title-toolbar-tab'>
                        <span className='div-center'>{this.props.from}:{this.props.to}</span>
                        <span className='div-center'>{subscribe}</span>
                    </div>
                    <div>
                        <div className='title-toolbar-tab'>
                            <span className={this.state.toolbar.areaChart?'nav-tool active':'nav-tool'} onClick={()=>this.toggle(id.areaChart)}>{string.areaChart}</span>
                            <span className={this.state.toolbar.volumeBar?'nav-tool active':'nav-tool'} onClick={()=>this.toggle(id.volumeBar)}>{string.volumeBar}</span>
                            <span className={this.state.toolbar.sma?'nav-tool active':'nav-tool'} onClick={()=>this.toggle(id.sma)}>{string.sma}</span>
                            <span className={this.state.toolbar.ema?'nav-tool active':'nav-tool'} onClick={()=>this.toggle(id.ema)}>{string.ema}</span>
                            <span className={this.state.toolbar.parabolicSAR?'nav-tool active':'nav-tool'} onClick={()=>this.toggle(id.parabolicSAR)}>{string.parabolicSAR}</span>
                            <span className={this.state.toolbar.elderRay?'nav-tool active':'nav-tool'} onClick={()=>this.toggle(id.elderRay)}>{string.elderRay}</span>
                            <span className={this.state.toolbar.bollingerBand?'nav-tool active':'nav-tool'} onClick={()=>this.toggle(id.bollingerBand)}>{string.bollingerBand}</span>
                            <span className={this.state.toolbar.macd?'nav-tool active':'nav-tool'} onClick={()=>this.toggle(id.macd)}>{string.macd}</span>
                            <span className={this.state.toolbar.rsi?'nav-tool active':'nav-tool'} onClick={()=>this.toggle(id.rsi)}>{string.rsi}</span>
                            <span className={this.state.toolbar.atr?'nav-tool active':'nav-tool'} onClick={()=>this.toggle(id.atr)}>{string.atr}</span>
                            <span className={this.state.toolbar.stochasticOscillator?'nav-tool active':'nav-tool'} onClick={()=>this.toggle(id.stochasticOscillator)}>{string.stochasticOscillator}</span>
                            {trendLine}
                            {value.isMobile?"":<span className={this.state.toolbar.horizontalLine?'nav-tool active':'nav-tool'} onClick={()=>this.toggle(id.horizontalLine)}><i className="material-icons md-18">timeline</i></span>}
                            <br/>
                            <span className={this.getHistoryType()===id.binance.candle_interval._1m?'nav-tool active':'nav-tool'} onClick={()=>this.switchHistory(id.binance.candle_interval._1m)}>{id.binance.candle_interval._1m}</span>
                            <span className={this.getHistoryType()===id.binance.candle_interval._3m?'nav-tool active':'nav-tool'} onClick={()=>this.switchHistory(id.binance.candle_interval._3m)}>{id.binance.candle_interval._3m}</span>
                            <span className={this.getHistoryType()===id.binance.candle_interval._5m?'nav-tool active':'nav-tool'} onClick={()=>this.switchHistory(id.binance.candle_interval._5m)}>{id.binance.candle_interval._5m}</span>
                            <span className={this.getHistoryType()===id.binance.candle_interval._15m?'nav-tool active':'nav-tool'} onClick={()=>this.switchHistory(id.binance.candle_interval._15m)}>{id.binance.candle_interval._15m}</span>
                            <span className={this.getHistoryType()===id.binance.candle_interval._30m?'nav-tool active':'nav-tool'} onClick={()=>this.switchHistory(id.binance.candle_interval._30m)}>{id.binance.candle_interval._30m}</span>
                            <span className={this.getHistoryType()===id.binance.candle_interval._1h?'nav-tool active':'nav-tool'} onClick={()=>this.switchHistory(id.binance.candle_interval._1h)}>{id.binance.candle_interval._1h}</span>
                            <span className={this.getHistoryType()===id.binance.candle_interval._2h?'nav-tool active':'nav-tool'} onClick={()=>this.switchHistory(id.binance.candle_interval._2h)}>{id.binance.candle_interval._2h}</span>
                            <span className={this.getHistoryType()===id.binance.candle_interval._4h?'nav-tool active':'nav-tool'} onClick={()=>this.switchHistory(id.binance.candle_interval._4h)}>{id.binance.candle_interval._4h}</span>
                            <span className={this.getHistoryType()===id.binance.candle_interval._6h?'nav-tool active':'nav-tool'} onClick={()=>this.switchHistory(id.binance.candle_interval._6h)}>{id.binance.candle_interval._6h}</span>
                            <span className={this.getHistoryType()===id.binance.candle_interval._8h?'nav-tool active':'nav-tool'} onClick={()=>this.switchHistory(id.binance.candle_interval._8h)}>{id.binance.candle_interval._8h}</span>
                            <span className={this.getHistoryType()===id.binance.candle_interval._12h?'nav-tool active':'nav-tool'} onClick={()=>this.switchHistory(id.binance.candle_interval._12h)}>{id.binance.candle_interval._12h}</span>
                            <span className={this.getHistoryType()===id.binance.candle_interval._1d?'nav-tool active':'nav-tool'} onClick={()=>this.switchHistory(id.binance.candle_interval._1d)}>{id.binance.candle_interval._1d}</span>
                            <span className={this.getHistoryType()===id.binance.candle_interval._3d?'nav-tool active':'nav-tool'} onClick={()=>this.switchHistory(id.binance.candle_interval._3d)}>{id.binance.candle_interval._3d}</span>
                        </div>
                    </div>
                </div>
                <div>
                    {showSubscriptionForm}
                    {subToolbar}
                    {toggleSubToolbar}
                </div>
                <div>
                </div>
            </div>
        )
    }
}

class SmaToolbar extends Component {
    constructor(props){
        super(props)
        const presenter=props.presenter
        const value=presenter.getSMAToolbar()
        this.state={
            presenter:presenter,
            fast:value.fast,
            medium:value.medium,
            slow:value.slow
        }
    }
    changeValue(key,evt){
        this.setState({
            [key]:evt.target.value,
        })
    }
    render(){
        return(
            <div> 
                <ul className={'subToolbarContainer'}>
                    <li className='nav'><span className='label-subToolbar'>{string.fast}</span><input type={'number'} min={0} className='input-subToolbar' placeholder={this.state.fast} onChange={(evt)=>this.changeValue(id.fast, evt)}/></li>
                    <li className='nav'><span className='label-subToolbar'>{string.medium}</span><input type={'number'} min={0} className='input-subToolbar' placeholder={this.state.medium} onChange={(evt)=>this.changeValue(id.medium, evt)}/></li>
                    <li className='nav'><span className='label-subToolbar'>{string.slow}</span><input type={'number'} min={0} className='input-subToolbar' placeholder={this.state.slow} onChange={(evt)=>this.changeValue(id.slow, evt)}/></li>
                    <li className='nav' onClick={()=>this.state.presenter.setSMAToolbar(this.state.fast,this.state.medium,this.state.slow)}>{string.update}</li>
                    <li className='nav small'>{string.sma}</li>
                </ul>
            </div>
        )
    }
}
class EmaToolbar extends Component{
    constructor(props){
        super(props)
        const presenter=props.presenter
        const value=presenter.getEMAToolbar()
        this.state={
            presenter:presenter,
            fast:value.fast,
            medium:value.medium,
            slow:value.slow,
        }
    }
    changeValue(key,evt){
        this.setState({
            [key]:evt.target.value
        })
    }
    render(presenter){
        return(
            <div>
                <ul className={'subToolbarContainer'}>
                    <li className='nav'><span className='label-subToolbar'>{string.fast}</span><input type={'number'} min={0} className='input-subToolbar' placeholder={this.state.fast} onChange={(evt)=>this.changeValue(id.fast,evt)}/></li>
                    <li className='nav'><span className='label-subToolbar'>{string.medium}</span><input type={'number'} min={0} className='input-subToolbar' placeholder={this.state.medium} onChange={(evt)=>this.changeValue(id.medium,evt)}/></li>
                    <li className='nav'><span className='label-subToolbar'>{string.slow}</span><input type={'number'} min={0} className='input-subToolbar' placeholder={this.state.slow} onChange={(evt)=>this.changeValue(id.slow,evt)}/></li>
                    <li className='nav' onClick={()=>this.state.presenter.setEMAToolbar(this.state.fast,this.state.medium,this.state.slow)}>{string.update}</li>
                    <li className='nav small'>{string.ema}</li>
                </ul>
            </div>
        )
    }
}
class AtrToolbar extends Component{
    constructor(props){
        super(props)
        const presenter=props.presenter
        const value=presenter.getATRToolbar()
        this.state={
            presenter:presenter,
            atr:value,
        }
    }
    changeValue(evt){
        this.setState({
            atr:evt.target.value,
        })
    }
    
    render(){
        return(
            <div>
                <ul className={'subToolbarContainer'}>
                    <li className='nav'><span className='label-subToolbar'>{string.atr}</span><input type={'number'} min={0} className='input-subToolbar' placeholder={this.state.atr} onChange={(evt)=>this.changeValue(evt)}/></li>
                    <li className='nav' onClick={()=>this.state.presenter.setATRToolbar(this.state.atr)}>{string.update}</li>
                    <li className='nav small'>{string.atr}</li>
                </ul>
            </div>
        )
    }
}
class ElderRayToolbar extends Component{
    constructor(props){
        super(props)
        const presenter=props.presenter
        const value=presenter.getElderRayToolbar()
        this.state={
            presenter:presenter,
            elderRay:value,
        }
    }
    changeValue(evt){
        this.setState({
            elderRay:evt.target.value,
        })
    }
    render(){
        return(
            <div>
                <ul className={'subToolbarContainer'}>
                    <li className='nav'><span className='label-subToolbar'>{string.elderRay}</span><input type={'number'} min={0} className='input-subToolbar' placeholder={this.state.elderRay} onChange={(evt)=>this.changeValue(evt)}/></li>
                    <li className='nav' onClick={()=>this.state.presenter.setElderRayToolbar(this.state.elderRay)}>{string.update}</li>
                    <li className='nav small'>{string.elderRay}</li>
                </ul>
            </div>
        )
    }
}
class MacdToolbar extends Component{
    constructor(props){
        super(props)
        const presenter=props.presenter
        const value=presenter.getMACDToolbar()
        this.state={
            presenter:presenter,
            fast:value.fast,
            slow:value.slow,
            signal:value.signal,
        }
    }
    changeValue(key,evt){
        this.setState({
            [key]:evt.target.value,
        })
    }
    render(){
        return(
            <div>
                <ul className={'subToolbarContainer'}>
                    <li className='nav'><span className='label-subToolbar'>{string.fast}</span><input type={'number'} min={0} className='input-subToolbar' placeholder={this.state.fast} onChange={(evt)=>this.changeValue(id.fast,evt)}/></li>
                    <li className='nav'><span className='label-subToolbar'>{string.slow}</span><input type={'number'} min={0} className='input-subToolbar' placeholder={this.state.slow} onChange={(evt)=>this.changeValue(id.slow,evt)}/></li>
                    <li className='nav'><span className='label-subToolbar'>{string.signal}</span><input type={'number'} min={0} className='input-subToolbar' placeholder={this.state.signal} onChange={(evt)=>this.changeValue(id.signal,evt)}/></li>
                    <li className='nav' onClick={()=>this.state.presenter.setMACDToolbar(this.state.fast,this.state.slow,this.state.signal)}>{string.update}</li>
                    <li className='nav small'>{string.macd}</li>
                </ul>
            </div>
        )
    }
}
class RsiToolbar extends Component{
    constructor(props){
        super(props)
        const presenter=props.presenter
        const value=presenter.getRSIToolbar()
        this.state={
            presenter:presenter,
            rsi:value,
        }
    }
    changeValue(evt){
        this.setState({
            rsi:evt.target.value
        })
    }
    render(){
        return(
            <div>
                <ul className={'subToolbarContainer'}>
                    <li className='nav'><span className='label-subToolbar'>{string.rsi}</span><input type={'number'} min={0} className='input-subToolbar' placeholder={this.state.rsi} onChange={(evt)=>this.changeValue(evt)}/></li>
                    <li className='nav' onClick={()=>this.state.presenter.setRSIToolbar(this.state.rsi)}>{string.update}</li>
                    <li className='nav small'>{string.rsi}</li>
                </ul>
            </div>
        )
    }
}
class StoToolbar extends Component{
    constructor(props){
        super(props)
        const presenter=props.presenter
        const value=presenter.getSTOToolbar()
        this.state={
            presenter:presenter,
            windowSize:value.windowSize,
            kWindowSize:value.kWindowSize,
            dWindowSize:value.dWindowSize,
        }
    }
    changeValue(key,evt){
        this.setState({
            [key]:evt.target.value
        })
    }
    render(){
        return(
            <div>
                <ul className={'subToolbarContainer'}>
                    <li className='nav'><span className='label-subToolbar'>{string.windowSize}</span><input type={'number'} min={0} className='input-subToolbar' placeholder={this.state.windowSize} onChange={(evt)=>this.changeValue(id.windowSize,evt)}/></li>
                    <li className='nav'><span className='label-subToolbar'>{string.kWindowSize}</span><input type={'number'} min={0} className='input-subToolbar' placeholder={this.state.kWindowSize} onChange={(evt)=>this.changeValue(id.kWindowSize,evt)}/></li>
                    <li className='nav'><span className='label-subToolbar'>{string.dWindowSize}</span><input type={'number'} min={0} className='input-subToolbar' placeholder={this.state.dWindowSize} onChange={(evt)=>this.changeValue(id.dWindowSize,evt)}/></li>
                    <li className='nav' onClick={()=>this.state.presenter.setSTOToolbar(this.state.windowSize,this.state.kWindowSize,this.state.dWindowSize)}>{string.update}</li>
                    <li className='nav small'>{string.stochasticOscillator}</li>
                </ul>
            </div>
        )
    }
}
class LineToolbar extends Component{
    constructor(props){
        super(props)
        this.state={color:id.green}
        this.handleLine=this.handleLine.bind(this)
    }
    handleLine(_id){
        if(_id===id.red||_id===id.green||_id===id.blue){
            this.setState({color:_id})
        }
        this.props.handleTrendLine(_id)
    }
    render(){
        return(
            <table style={{border:0}}>
                <tbody>
                <tr>
                    <td className={this.state.color===id.red?'color-palette active border red':'color-palette border red'} onClick={()=>this.handleLine(id.red)}></td>
                    <td className={this.state.color===id.green?'color-palette active border green':'color-palette border green'} onClick={()=>this.handleLine(id.green)}></td>
                    <td className={this.state.color===id.blue?'color-palette active border blue':'color-palette border blue'} onClick={()=>this.handleLine(id.blue)}></td>
                    <td className={this.props.handleTrendLineId===id.drawLine?'small-left-right-padding active cursor':'small-left-right-padding cursor'} onClick={()=>this.handleLine(id.drawLine)}><i className="material-icons">mode_edit</i> </td>
                    <td className={this.props.handleTrendLineId===id.deleteLine?'small-left-right-padding active cursor':'small-left-right-padding cursor'} onClick={()=>this.handleLine(id.deleteLine)}><i className="material-icons">delete</i> </td>
                </tr>
                </tbody>
            </table>
        )
    }
}

class SubscriptionForm extends Component{
    constructor(props){
        super(props)
        this.state={
            [id.toolbar.email]:this.props.presenter.getEmail(),
            showOtpInput:false,
            [id.toolbar.otp]:'',
            subsLoader:'',
        }
        this.setOtpInput=this.setOtpInput.bind(this)
        this.submit=this.submit.bind(this)
        this.setEmailSubscription=this.setEmailSubscription.bind(this)
    }
    changeValue(key,evt){
        this.setState({
            [key]:evt.target.value
        })
    }
    submit(){
        this.setState({subsLoader:<Loading/>})
        if(this.state.showOtpInput){
            this.props.presenter.setEmail(this.state[id.toolbar.email])
            this.props.presenter.submitOTP(this.state[id.toolbar.email],this.props.from,this.props.to,this.state[id.toolbar.otp],this.props.setEmailSubscription)
        }else{
            this.props.presenter.subscribe(this.state[id.toolbar.email],this.props.from,this.props.to,this.setOtpInput)
        }
    }
    setOtpInput(value){
        this.setState({
            showOtpInput:value,
            subsLoader:'',
        })
    }
    setEmailSubscription(email){
        this.setState({subsLoader:'',showOtpInput:false,[id.toolbar.otp]:''})
        this.props.setEmailSubscription(email)
    }
    render(){
        const otpInput=this.state.showOtpInput?<li className='nav very-small-padding'><input type={'text'} min={0} className='input-otp' placeholder={string.toolbar.enterOtp} onChange={(evt)=>this.changeValue(id.toolbar.otp,evt)}/></li>:''
        return(
        <div>
            <ul className={'subToolbarContainer'}>
                <li className='nav very-small-padding'><input type={'email'} min={0} className='input-email' placeholder={string.toolbar.enterEmail} value={this.state[id.toolbar.email]} onChange={(evt)=>this.changeValue(id.toolbar.email,evt)}/></li>
                {otpInput}
                <li className='nav' onClick={()=>this.submit()}>{string.toolbar.submit}</li>
            </ul>
            {this.state.subsLoader}
        </div>
        )
    }
}



export default Toolbar