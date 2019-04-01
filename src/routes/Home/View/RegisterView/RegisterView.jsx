import React, { Component } from 'react';
import style from './RegisterView.scss';
import {api} from 'common/app'

import LocationBox from 'components/LocationBox'
    
export class RegisterView extends Component {
constructor(props) {
   super(props);
   this.state = {
      meetingid:null,
      formfield:[],
      formdata:{},
   };
   this.refreshProps = this.refreshProps.bind(this);
   this.HandleFormDataValue = this.HandleFormDataValue.bind(this);
   this.getRegisterField = this.getRegisterField.bind(this);
   this.createField = this.createField.bind(this);
   this.HandleSubmit = this.HandleSubmit.bind(this);
}
componentWillReceiveProps(nextprops) {
   this.refreshProps(nextprops);
}
componentDidMount() {
   this.refreshProps(this.props);
}
refreshProps(props) {
   let params = props.match.params;
   if (this.state.id != params.id) {
     this.state.meetingid = params.id;
     this.setState(this.state);
     this.getRegisterField(params.id);
   }
}
HandleFormDataValue(type,value){
   this.state.formdata[type] = value;
   this.setState(this.state);
}
HandleLocationPick(type,data){
   this.state.formdata[type] = data.Province + '-' + data.City + '-' + data.Region;
   this.setState(this.state);
}
getRegisterField(id){
   api.getRegisterField(id).then(res=>{
      if (res.code === 200) {
         if (res.result.length === 0 ) {
            window.history.back();
         }
         this.state.formfield = res.result;
         this.setState(this.state);
      }else{
         alert(res.message);
      }
   },err=>{
      console.log(err);
      
   })
}
createField(){
   let result = [];
   for (let z = 0; z < this.state.formfield.length; z++) {
      const element = this.state.formfield[z];
      switch (element.type) {
         case 'input':
            result.push(
               <OrdinaryInputBox name={element.zh_name+(element.is_required=='1'?'*':'')} onChange={this.HandleFormDataValue.bind(this,element.en_name)}/>
            ) 
            break;
         case 'select':
         let getKeyArray=[];
            for (const key in element.check) {
               let check = element.check;
               if (check.hasOwnProperty(key)) {
               const obj = check[key];
               getKeyArray.push({
                  key:key,
                  value:obj
               })
               }
            }
            result.push(
               <SelectOptionBox  name={element.zh_name+(element.is_required=='1'?'*':'')} Option={getKeyArray} onChange={this.HandleFormDataValue.bind(this,element.en_name)}/>
            )
            break;
         case 'location':
            result.push(
               <LocaltionBox name={element.zh_name+(element.is_required=='1'?'*':'')} placeholder={' '} value={this.state.formdata.localtion} onChange={this.HandleLocationPick.bind(this,element.en_name)}/>
            );
            break
         default:
            break;
      }
   }
   return result;
}
HandleSubmit(){
   
   api.ApplyRegister(this.state.meetingid,this.state.formdata).then(res=>{
      console.log(res);
      if (res.code === 200) {
         
      }
      alert(res.message);
   },err=>{
      console.log(err);
      
   })
}
render() {
   return (
   <div className={[style.RegisterView,'childcenter childcolumn childcontentstart'].join(' ')}>
       <div className={style.RegisterTitle}>
         请务必填写有效信息，以保证注册确认函和其他会议信息的有效传达，感谢您的耐心填写
       </div>
       <div className={style.FormBody}>
         <div className={[style.FormName,'childcenter childalignstart childcolumn'].join(' ')}>
            <div className={style.NameValue}>
            基本信息
            </div>
         </div>
         <div className={style.FormInputGroup}>
            {this.createField()}
         </div>
         <div className={[style.SubmitGroup,'childcenter'].join(' ')}>
            <div className={[style.Button,'childcenter'].join(' ')} onClick={this.HandleSubmit}>
               报名
            </div>
         </div>
       </div>
   </div>
   );
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
         <div className={style.InputBox}>
            <div className={style.InputName}>
               <span>{this.props.name}</span>
            </div>
            <div className={style.InputBox} >
               <input type="text" placeholder={this.props.placeholder} value={this.props.value} onChange={this.HandleInputValue}/>
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
      this.state.SelectValue = props.Selected?props.Selected:this.state.SelectValue;
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
         <div className={style.InputBox}>
            <div className={style.InputName}>
               <span>{this.props.name}</span>
            </div>
            <div className={style.SelectedOptionBox} >
               <div className={[style.SelectedValue,'childcenter childcontentstart'].join(' ')} onClick={this.HandleDrop.bind(this,true)}>
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
         <div className={style.InputBox}>
            <div className={style.InputName}>
               <span>{this.props.name}</span>
            </div>
            <div className={style.LocaltionInput} >
               <LocationBox placeholder={this.props.placeholder} value={this.CompileValue()} onChange={this.props.onChange}/>
            </div>
         </div>
      )
   }
}

export default RegisterView;