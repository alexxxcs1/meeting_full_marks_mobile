import React, { Component } from 'react'
import style from './BindWechatView.scss'
import {api} from 'common/app'
  
let getcodeInterval;

export class BindWechatView extends Component {
constructor(props) {
  super(props);
  this.state = {
      onAjax:false,
      meetingid:null,
      phone:'',
      code:'',
      getcodecd:60,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.HandleInputValue = this.HandleInputValue.bind(this);
     this.HandleGetCode = this.HandleGetCode.bind(this);
     this.SubmitBind = this.SubmitBind.bind(this);
     this.onInputBlur = this.onInputBlur.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
    let params = props.match.params;
    if (this.state.meetingid != params.id) {
      this.state.meetingid = params.id;
      this.setState(this.state);
    }
}
HandleInputValue(type,e){
    this.state[type] = e.target.value;
    this.setState(this.state);
}
HandleGetCode(){
    if(this.state.onAjax) return;
    if (!this.state.phone) {
        alert('请先输入要绑定的手机号！');
        return ;
    }
    this.state.onAjax = true;
    this.setState(this.state);
    api.getRegisterCode(this.state.meetingid,this.state.phone).then(res=>{
        console.log(res);
        if (res.code === 200) {
            this.state.getcodecd -= 1;
            getcodeInterval = setInterval(() => {
                this.state.getcodecd -= 1;
                this.setState(this.state);
                if (this.state.getcodecd<=0) {
                    this.state.getcodecd = 60;
                    this.setState(this.state);
                    clearInterval(getcodeInterval);
                }
            }, 1000);
        }else{
            alert(res.message)
        }
        this.state.onAjax = false;
        this.setState(this.state);
    },err=>{
        console.log(err);
        this.state.onAjax = false;
        this.setState(this.state);
    })
}
SubmitBind(){
    if (!this.state.phone||!this.state.code) {
        alert('请输入完整的信息');
        return ;
    }
    api.BindWechat(this.state.meetingid,this.state.phone,this.state.code).then(res=>{
        console.log(res);
        if (res.code === 200) {
            window.location.hash = '#/home/user/' + this.state.meetingid
        }
        alert(res.message);
    },err=>{
        console.log(err);
        
    })
}
componentWillUnmount(){
    clearInterval(getcodeInterval);
}
onInputBlur() {
    document.documentElement.scrollTop = 0;
    window.pageYOffset = 0;
    document.body.scrollTop = 0;
}
render() {
  return (
    <div className={style.BindWechatView}>
        <div className={style.RegisterTitle}>
            绑定手机号码后，拥有个人专属会议二维码，享受会中服务
        </div>
        <div className={style.FormBody}>
           <div className={[style.FormName, 'childcenter childalignstart childcolumn'].join(' ')}>
            <div className={style.NameValue}>
                 一步完成注册
            </div>
            <div className={style.InputBox}>
                <div className={style.InputName}>
                    <span>手机号码</span>
                </div>
                <div className={style.InputBox} >
                    <input onBlur={this.onInputBlur} type="text" placeholder={this.props.placeholder} value={this.props.phone} onChange={this.HandleInputValue.bind(this,'phone')} />
                </div>
            </div>
            <div className={style.InputBox}>
                <div className={style.InputName}>
                    <span>验证码</span>
                </div>
                <div className={[style.InputBox,'childcenter'].join(' ')} >
                    <div className={style.PhoneCodeInput}>
                        <input onBlur={this.onInputBlur} type="text" maxLength='6' placeholder={this.props.placeholder} value={this.props.code} onChange={this.HandleInputValue.bind(this,'code')} />
                    </div>
                    <div className={[style.getCodeButton,this.state.getcodecd == 60?'':style.onCoutdown,'childcenter'].join(' ')} onClick={this.state.getcodecd == 60?this.HandleGetCode:()=>{}}>{this.state.getcodecd == 60?'获取验证码':this.state.getcodecd + 's'}</div>
                </div>
            </div>
        </div>
        <div className={[style.HandleUpdate,'childcenter'].join(' ')}>
            <div className={[style.CancelButton,'childcenter'].join(' ')} onClick={(()=>{window.location.hash='#/home/index/'+this.state.meetingid;})}>
                返回
            </div>
            <div className={[style.ConfirmButton,'childcenter'].join(' ')} onClick={this.SubmitBind}>
                提交
            </div>
        </div>
        </div>
    </div>
   )
   }
}
export default BindWechatView