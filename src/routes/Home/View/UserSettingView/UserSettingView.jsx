import React, { Component } from 'react'
import style from './UserSettingView.scss'

import LocationBox from 'components/LocationBox'
import {api} from 'common/app'
  
export class UserSettingView extends Component {
constructor(props) {
  super(props);
  this.state = {
    meetingid:null,
    formfield:[],
    _formdata:{},
    formdata:{},
    isReadOnly:true,
  };
  this.refreshProps = this.refreshProps.bind(this);
  this.getUserInfo = this.getUserInfo.bind(this);
  this.createField = this.createField.bind(this);
  this.HandleFormDataValue = this.HandleFormDataValue.bind(this);
  this.HandleLocationPick = this.HandleLocationPick.bind(this);
  this.updateUserInfo = this.updateUserInfo.bind(this);
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
      this.getUserInfo(params.id);
    }
}
getUserInfo(id){
    api.getUserInfo(id).then(res=>{
        if (res.code === 200) {
            this.state.formfield = res.result.field;
            this.state.formdata = res.result.data;
            this.setState(this.state);
        }else{
            alert(res.message);
        }
    },err=>{
        console.log(err);
        
    })
}
HandleFormDataValue(type,value){
    this.state.formdata[type] = value;
    this.setState(this.state);
 }
 HandleLocationPick(type,data){
    this.state.formdata[type] = data.Province + '-' + data.City + '-' + data.Region;
    this.setState(this.state);
 }
createField(){
    let result = [];
    for (let z = 0; z < this.state.formfield.length; z++) {
       const element = this.state.formfield[z];
       switch (element.type) {
          case 'input':
             result.push(
                <OrdinaryInputBox readonly={element.en_name == 'mobile'?true:this.state.isReadOnly} value={this.state.formdata[element.en_name]} name={element.zh_name+(element.is_required=='1'?'*':'')} onChange={this.HandleFormDataValue.bind(this,element.en_name)}/>
             ) 
             break;
          case 'select':
             let selectData=this.state.formdata[element.en_name];
             let selectedIndex = 0;
             let getKeyArray=[];
             let index = 0;
             for (const key in element.check) {
                let check = element.check;
                if (check.hasOwnProperty(key)) {
                    const obj = check[key];
                    if (obj == selectData) {
                        selectedIndex = index;
                    }
                    getKeyArray.push({
                    key:key,
                    value:obj
                    })
                    index++;
                }
             }
             result.push(
                <SelectOptionBox readonly={element.en_name == 'mobile'?true:this.state.isReadOnly}  Selected={selectedIndex} name={element.zh_name+(element.is_required=='1'?'*':'')} Option={getKeyArray} onChange={this.HandleFormDataValue.bind(this,element.en_name)}/>
             )
             break;
          case 'location':
             result.push(
                <LocaltionBox readonly={element.en_name == 'mobile'?true:this.state.isReadOnly} value={this.state.formdata[element.en_name]} name={element.zh_name+(element.is_required=='1'?'*':'')} placeholder={' '} onChange={this.HandleLocationPick.bind(this,element.en_name)}/>
             );
             break
          default:
             break;
       }
    }
    return result;
 }
updateUserInfo(){
   console.log(this.state);
   let option={};
   for (let z = 0; z < this.state.formfield.length; z++) {
      const element = this.state.formfield[z];
      option[element.en_name] = this.state.formdata[element.en_name];
   }
   api.updateUserInfo(this.state.meetingid,option,this.state.formdata.uid).then(res=>{
      console.log(res);
      if (res.code === 200) {
         this.setState({
            isReadOnly:true,
         })
      }else{

      }
      alert(res.message)
   },err=>{
      console.log(err);
      
   })
}
render() {
  return (
    <div className={style.UserSettingView}>
        <div className={style.FormBody}>
            {this.createField()}
        </div>
        <div className={[style.HandleUpdate,'childcenter'].join(' ')}>
            {this.state.isReadOnly&&Object.keys(this.state.formdata).length?<div className={[style.ConfirmButton,'childcenter'].join(' ')} onClick={(()=>{
               this.setState({
                  _formdata:JSON.parse(JSON.stringify(this.state.formdata)),
                  isReadOnly:false,
               })
            }).bind(this)}>
                编辑
            </div>:''}
            {this.state.isReadOnly?'':[<div className={[style.ConfirmButton,'childcenter'].join(' ')} onClick={this.updateUserInfo}>
                更新
            </div>,
            <div className={[style.CancelButton,'childcenter'].join(' ')} onClick={(()=>{
               this.setState({
                  formdata:JSON.parse(JSON.stringify(this.state._formdata)),
                  _formdata:{},
                  isReadOnly:true,
               })
            }).bind(this)}>
                取消
            </div>]}
        </div>
    </div>
   )
   }
}

class OrdinaryInputBox extends Component{
    constructor(props){
       super(props);
       this.state={
          value:'',
       };
       this.HandleInputValue = this.HandleInputValue.bind(this);
       this.refreshProps = this.refreshProps.bind(this);
    }
    componentDidMount(){
       this.refreshProps(this.props);
    }
    componentWillReceiveProps(nextprop){
       this.refreshProps(nextprop);
    }
    refreshProps(props){
       this.state.value = props.value;
       this.setState(this.state);
    }
    HandleInputValue(e){
       this.props.onChange(e.target.value);
    }
    render(){
       return (
          <div className={[style.InputRowBox,'childcenter'].join(' ')}>
             <div className={style.InputName}>
                <span>{this.props.name}</span>
             </div>
             <div className={style.InputBox} >
                <input readOnly={this.props.readonly} type="text" placeholder={this.props.placeholder} value={this.props.value} onChange={this.HandleInputValue}/>
             </div>
          </div>
       )
    }
 }
 
 let TOUCHSTARTPOSTION=0;
 const TOUCHRATION = 50;
 class SelectOptionBox extends Component{
    constructor(props){
       super(props);
       this.state={
          Option:[],
          SelectValue:null,
          SelectIndex:0,
          Drop:false,
       };
       this.createOption = this.createOption.bind(this);
       this.HandleTouchStart = this.HandleTouchStart.bind(this);
       this.HandleTouchMove = this.HandleTouchMove.bind(this);
       this.HandleTouchEnd = this.HandleTouchEnd.bind(this);
       this.HandleSelect = this.HandleSelect.bind(this);
    }
    componentDidMount(){
       this.refreshProps(this.props);
    }
    componentWillReceiveProps(nextprop){
       this.refreshProps(nextprop);
    }
    refreshProps(props){
       this.state.Option = props.Option?props.Option:this.state.Option;
       this.state.SelectIndex = props.Selected?props.Selected:this.state.SelectIndex;
       this.state.SelectValue = props.Selected!=undefined?props.Selected:this.state.SelectValue;
       this.setState(this.state);
    }
    HandleSelect(){
       this.state.SelectValue = this.state.SelectIndex;
       this.state.Drop = false;
       this.props.onChange(this.state.Option[this.state.SelectValue].value)
       
       this.setState(this.state);
    }
    createOption(){
       let result = [];
       let selectedOption =  <div className={[style.Option,style.Selected,'childcenter'].join(' ')}>{this.state.Option[this.state.SelectIndex].value}</div>;
       let afterOption;
       if (this.state.SelectIndex+1>=this.state.Option.length) {
          afterOption = <div className={[style.Option,style.FirstSpare,'childcenter'].join(' ')}>{this.state.Option[(this.state.SelectIndex + 1)%(this.state.Option.length)].value}</div>;
       }else{
          afterOption = <div className={[style.Option,style.FirstSpare,'childcenter'].join(' ')}>{this.state.Option[this.state.SelectIndex + 1].value}</div>;
       }
       let moreafterOption;
       if (this.state.SelectIndex+2>=this.state.Option.length) {
          moreafterOption = <div className={[style.Option,style.SecondSpare,'childcenter'].join(' ')}>{this.state.Option[(this.state.SelectIndex + 2)%(this.state.Option.length)].value}</div>;
       }else{
          moreafterOption = <div className={[style.Option,style.SecondSpare,'childcenter'].join(' ')}>{this.state.Option[(this.state.SelectIndex + 2)].value}</div>;
       }
       let beforeOption;
       if (this.state.SelectIndex-1<0) {
          beforeOption = <div className={[style.Option,style.FirstSpare,'childcenter'].join(' ')}>{this.state.Option[(this.state.Option.length-1)%(this.state.Option.length)].value}</div>;
       }else{
          beforeOption = <div className={[style.Option,style.FirstSpare,'childcenter'].join(' ')}>{this.state.Option[this.state.SelectIndex - 1].value}</div>;
       }
       let morebeforeOption;
       if (this.state.SelectIndex-2<0) {
          morebeforeOption = <div className={[style.Option,style.SecondSpare,'childcenter'].join(' ')}>{this.state.Option[((this.state.Option.length) - Math.abs(this.state.SelectIndex-2))%(this.state.Option.length)].value}</div>;
       }else{
          morebeforeOption = <div className={[style.Option,style.SecondSpare,'childcenter'].join(' ')}>{this.state.Option[this.state.SelectIndex - 2].value}</div>;
       }
       
       result.push(morebeforeOption,beforeOption,selectedOption,afterOption,moreafterOption);
       return result;
    }
    HandleTouchStart(e){
       let touch = e.touches[0];
       TOUCHSTARTPOSTION = touch.pageY;
       
    }
    HandleTouchMove(e){
       let touch = e.touches[0];
       let direction = touch.pageY - TOUCHSTARTPOSTION;
       switch (true) {
          case direction>TOUCHRATION:
             this.state.SelectIndex-=1;
             if (this.state.SelectIndex<0) {
                this.state.SelectIndex = this.state.Option.length-1;
             }
             
             TOUCHSTARTPOSTION = touch.pageY;
             break;
          case direction<(-TOUCHRATION):
             this.state.SelectIndex+=1;
             if (this.state.SelectIndex>(this.state.Option.length-1)) {
                this.state.SelectIndex = 0;
             }
 
             TOUCHSTARTPOSTION = touch.pageY;
             break;
          default:
             
             break;
       }
       this.setState(this.state);
    }
    HandleTouchEnd(e){
       TOUCHSTARTPOSTION = 0;
    }
    HandleDrop(boolean){
       this.state.Drop = boolean;
       this.setState(this.state);
    }
    render(){
       return (
          <div className={[style.InputRowBox,'childcenter'].join(' ')}>
             <div className={style.InputName}>
                <span>{this.props.name}</span>
             </div>
             <div className={style.SelectedOptionBox} >
                <div className={[style.SelectedValue,'childcenter childcontentstart'].join(' ')} onClick={this.props.readonly?()=>{}:this.HandleDrop.bind(this,true)}>
                   {this.state.SelectValue!=null?this.state.Option[this.state.SelectValue].value: <span className={style.PlaceHolder}>{this.props.placeholder}</span> }
                </div>
                {this.state.Option.length !== 0&&this.state.Drop?<div className={style.DropBox}>
                   <div className={style.DropOption}>
                      <div className={[style.HandleButtonGroup,'childcenter'].join(' ')}>
                         <div className={[style.ButtonBox,'childcenter childcontentstart'].join(' ')}>
                            <div className={[style.Button,'childcenter'].join(' ')} onClick={this.HandleDrop.bind(this,false)}>取消</div>
                         </div>
                         <div className={[style.ButtonBox,'childcenter childcontentend'].join(' ')}>
                            <div className={[style.Button,'childcenter'].join(' ')} onClick={this.HandleSelect}>确定</div>
                         </div>
                      </div>
                      <div className={[style.OptionBox,'childcenter childcolumn'].join(' ')}
                         onTouchStart={this.HandleTouchStart}
                         onTouchMove={this.HandleTouchMove}
                         onTouchEnd={this.HandleTouchEnd}>
                         {this.createOption()}
                      </div>
                   </div>
                </div>:''}
             </div>
          </div>
       )
    }
 }
 
 class LocaltionBox extends Component{
    constructor(props){
       super(props);
       this.state = {};
       this.CompileValue = this.CompileValue.bind(this);
    }
    CompileValue(){
       if (!this.props.value) {
          return null;
       }
       let valuearray =  this.props.value.split('-');
       return {
          Province:valuearray[0],
          City:valuearray[1],
          Region:valuearray[2]
       }
    }
    render(){
       return (
          <div className={[style.InputRowBox,'childcenter'].join(' ')}>
             <div className={style.InputName}>
                <span>{this.props.name}</span>
             </div>
             <div className={style.LocaltionInput} >
                <LocationBox readOnly={this.props.readonly} placeholder={this.props.placeholder} value={this.CompileValue()} onChange={this.props.onChange}/>
             </div>
          </div>
       )
    }
 }

export default UserSettingView