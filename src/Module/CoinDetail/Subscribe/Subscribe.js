import React,{Component} from 'react'

class Subscribe extends Component{
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
        // const otpInput=this.state.showOtpInput?<li className='nav very-small-padding'><input type={'text'} min={0} className='input-otp' placeholder={string.toolbar.enterOtp} onChange={(evt)=>this.changeValue(id.toolbar.otp,evt)}/></li>:''
        return(
        <div>
            This is the Subscription Form!
            <div>
                <input/>
                <input/>
                <a href='#'>Submit</a>
            </div>
        </div>
        )
    }
}

export default Subscribe