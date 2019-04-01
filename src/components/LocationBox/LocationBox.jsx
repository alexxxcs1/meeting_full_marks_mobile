import React, { Component } from 'react'
import style from './LocationBox.scss'
import CityJson from './CityJson.json'
  
let TOUCHSTARTPOSTION=0;
const TOUCHRATION = 50;

export class LocationBox extends Component {
constructor(props) {
  super(props);
  this.state = {
    ProvinceArray:[],
    ProvinceSelected:0,
    CityArray:[],
    CitySelected:0,
    RegionArray:[],
    RegionSelected:0,
    Drop:false,
    ProvinceSelected_Value:null,
    CitySelected_Value:null,
    RegionSelected_Value:null,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.getProvince = this.getProvince.bind(this);
     this.getCity = this.getCity.bind(this);
     this.getRegion = this.getRegion.bind(this);

     this.createProvinceOption = this.createProvinceOption.bind(this);
     this.createCityOption = this.createCityOption.bind(this);
     this.HandleDrop = this.HandleDrop.bind(this);
     this.HandleSelect = this.HandleSelect.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  this.getProvince();
  this.getCity();
  this.getRegion();
}
refreshProps(props) {
  if (props.value) {
      this.state.ProvinceSelected_Value = props.value.Province;
      this.state.CitySelected_Value = props.value.City;
      this.state.RegionSelected_Value = props.value.Region;
      this.setState(this.state);
  }
}
getProvince(){
    let ProvinceArray=[];
    for (const key in CityJson) {
        if (CityJson.hasOwnProperty(key)) {
            ProvinceArray.push(key);
        }
    }
    this.state.ProvinceArray = ProvinceArray;
    this.setState(this.state);
}
getCity(){
    let CityArray=[];
    let Province = CityJson[this.state.ProvinceArray[this.state.ProvinceSelected]];
    for (const key in Province) {
        if (Province.hasOwnProperty(key)) {
            CityArray.push(key);
        }
    }
    this.state.CityArray = CityArray;
    this.setState(this.state);
}
getRegion(){
    let Province = CityJson[this.state.ProvinceArray[this.state.ProvinceSelected]];
    let CityChild = Province[this.state.CityArray[this.state.CitySelected]];
    let Region = CityChild;
    this.state.RegionArray = Region;
    this.setState(this.state);
}
createProvinceOption(){
    let result = [];
    let selectedOption =  <div className={[style.Option,style.Selected,'childcenter'].join(' ')}>{this.state.ProvinceArray[this.state.ProvinceSelected]}</div>;
    let afterOption;
    if (this.state.ProvinceSelected+1>=this.state.ProvinceArray.length) {
       afterOption = <div className={[style.Option,style.FirstSpare,'childcenter'].join(' ')}>{this.state.ProvinceArray[(this.state.ProvinceSelected + 1)%(this.state.ProvinceArray.length)]}</div>;
    }else{
       afterOption = <div className={[style.Option,style.FirstSpare,'childcenter'].join(' ')}>{this.state.ProvinceArray[this.state.ProvinceSelected + 1]}</div>;
    }
    let moreafterOption;
    if (this.state.ProvinceSelected+2>=this.state.ProvinceArray.length) {
       moreafterOption = <div className={[style.Option,style.SecondSpare,'childcenter'].join(' ')}>{this.state.ProvinceArray[(this.state.ProvinceSelected + 2)%(this.state.ProvinceArray.length)]}</div>;
    }else{
       moreafterOption = <div className={[style.Option,style.SecondSpare,'childcenter'].join(' ')}>{this.state.ProvinceArray[(this.state.ProvinceSelected + 2)]}</div>;
    }
    let beforeOption;
    if (this.state.ProvinceSelected-1<0) {
       beforeOption = <div className={[style.Option,style.FirstSpare,'childcenter'].join(' ')}>{this.state.ProvinceArray[(this.state.ProvinceArray.length-1)%(this.state.ProvinceArray.length)]}</div>;
    }else{
       beforeOption = <div className={[style.Option,style.FirstSpare,'childcenter'].join(' ')}>{this.state.ProvinceArray[this.state.ProvinceSelected - 1]}</div>;
    }
    let morebeforeOption;
    if (this.state.ProvinceSelected-2<0) {
       morebeforeOption = <div className={[style.Option,style.SecondSpare,'childcenter'].join(' ')}>{this.state.ProvinceArray[(this.state.ProvinceArray.length) - Math.abs(this.state.ProvinceSelected-2)]}</div>;
    }else{
       morebeforeOption = <div className={[style.Option,style.SecondSpare,'childcenter'].join(' ')}>{this.state.ProvinceArray[this.state.ProvinceSelected - 2]}</div>;
    }
    
    result.push(morebeforeOption,beforeOption,selectedOption,afterOption,moreafterOption);
    return result;
}
createCityOption(){
    let result = [];
    let selectedOption =  <div className={[style.Option,style.Selected,'childcenter'].join(' ')}>{this.state.CityArray[this.state.CitySelected]}</div>;
    let afterOption;
    if (this.state.CitySelected+1>=this.state.CityArray.length) {
       afterOption = <div className={[style.Option,style.FirstSpare,'childcenter'].join(' ')}>{this.state.CityArray[(this.state.CitySelected + 1)%(this.state.CityArray.length)]}</div>;
    }else{
       afterOption = <div className={[style.Option,style.FirstSpare,'childcenter'].join(' ')}>{this.state.CityArray[this.state.CitySelected + 1]}</div>;
    }
    let moreafterOption;
    if (this.state.CitySelected+2>=this.state.CityArray.length) {
       moreafterOption = <div className={[style.Option,style.SecondSpare,'childcenter'].join(' ')}>{this.state.CityArray[(this.state.CitySelected + 2)%(this.state.CityArray.length)]}</div>;
    }else{
       moreafterOption = <div className={[style.Option,style.SecondSpare,'childcenter'].join(' ')}>{this.state.CityArray[(this.state.CitySelected + 2)]}</div>;
    }
    let beforeOption;
    if (this.state.CitySelected-1<0) {
       beforeOption = <div className={[style.Option,style.FirstSpare,'childcenter'].join(' ')}>{this.state.CityArray[(this.state.CityArray.length-1)%(this.state.CityArray.length)]}</div>;
    }else{
       beforeOption = <div className={[style.Option,style.FirstSpare,'childcenter'].join(' ')}>{this.state.CityArray[this.state.CitySelected - 1]}</div>;
    }
    let morebeforeOption;
    if (this.state.CitySelected-2<0) {
       morebeforeOption = <div className={[style.Option,style.SecondSpare,'childcenter'].join(' ')}>{this.state.CityArray[((this.state.CityArray.length) - Math.abs(this.state.CitySelected-2))%(this.state.CityArray.length)]}</div>;
    }else{
       morebeforeOption = <div className={[style.Option,style.SecondSpare,'childcenter'].join(' ')}>{this.state.CityArray[this.state.CitySelected - 2]}</div>;
    }
    
    result.push(morebeforeOption,beforeOption,selectedOption,afterOption,moreafterOption);
    return result;
 }
createRegionOption(){
    let result = [];
    let selectedOption =  <div className={[style.Option,style.Selected,'childcenter'].join(' ')}>{this.state.RegionArray[this.state.RegionSelected]}</div>;
    let afterOption;
    if (this.state.RegionSelected+1>=this.state.RegionArray.length) {
       afterOption = <div className={[style.Option,style.FirstSpare,'childcenter'].join(' ')}>{this.state.RegionArray[(this.state.RegionSelected + 1)%(this.state.RegionArray.length)]}</div>;
    }else{
       afterOption = <div className={[style.Option,style.FirstSpare,'childcenter'].join(' ')}>{this.state.RegionArray[this.state.RegionSelected + 1]}</div>;
    }
    let moreafterOption;
    if (this.state.RegionSelected+2>=this.state.RegionArray.length) {
       moreafterOption = <div className={[style.Option,style.SecondSpare,'childcenter'].join(' ')}>{this.state.RegionArray[(this.state.RegionSelected + 2)%(this.state.RegionArray.length)]}</div>;
    }else{
       moreafterOption = <div className={[style.Option,style.SecondSpare,'childcenter'].join(' ')}>{this.state.RegionArray[(this.state.RegionSelected + 2)]}</div>;
    }
    let beforeOption;
    if (this.state.RegionSelected-1<0) {
       beforeOption = <div className={[style.Option,style.FirstSpare,'childcenter'].join(' ')}>{this.state.RegionArray[(this.state.RegionArray.length-1)%(this.state.RegionArray.length)]}</div>;
    }else{
       beforeOption = <div className={[style.Option,style.FirstSpare,'childcenter'].join(' ')}>{this.state.RegionArray[this.state.RegionSelected - 1]}</div>;
    }
    let morebeforeOption;
    if (this.state.RegionSelected-2<0) {
       morebeforeOption = <div className={[style.Option,style.SecondSpare,'childcenter'].join(' ')}>{this.state.RegionArray[((this.state.RegionArray.length) - Math.abs(this.state.RegionSelected-2))%(this.state.RegionArray.length)]}</div>;
    }else{
       morebeforeOption = <div className={[style.Option,style.SecondSpare,'childcenter'].join(' ')}>{this.state.RegionArray[this.state.RegionSelected - 2]}</div>;
    }
    
    result.push(morebeforeOption,beforeOption,selectedOption,afterOption,moreafterOption);
    return result;
}
HandleTouchStart(type,e){
   let touch = e.touches[0];
   TOUCHSTARTPOSTION = touch.pageY;
   
}
HandleTouchMove(type,e){
   let touch = e.touches[0];
   let direction = touch.pageY - TOUCHSTARTPOSTION;

   switch (true) {
      case direction>TOUCHRATION:
         this.state[type+'Selected']-=1;
         if (this.state[type+'Selected']<0) {
            this.state[type+'Selected'] = this.state[type+'Array'].length-1;
         }
         
         TOUCHSTARTPOSTION = touch.pageY;
         switch (type) {
            case 'Province':
                this.state.CitySelected = 0;
                this.state.RegionSelected = 0;
                this.getCity();
                this.getRegion();
                break;
            case 'City':
                this.state.RegionSelected = 0;
                this.getRegion();
                break;
            default:
                break;
        }
         break;
      case direction<(-TOUCHRATION):
         this.state[type+'Selected']+=1;
         if (this.state[type+'Selected']>(this.state[type+'Array'].length-1)) {
            this.state[type+'Selected'] = 0;
         }
         TOUCHSTARTPOSTION = touch.pageY;
         switch (type) {
            case 'Province':
                this.state.CitySelected = 0;
                this.state.RegionSelected = 0;
                this.getCity();
                this.getRegion();
                break;
            case 'City':
                this.state.RegionSelected = 0;
                this.getRegion();
                break;
            default:
                break;
        }
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
HandleSelect(){
    this.state.ProvinceSelected_Value = this.state.ProvinceArray[this.state.ProvinceSelected];
    this.state.CitySelected_Value = this.state.CityArray[this.state.CitySelected];
    this.state.RegionSelected_Value = this.state.RegionArray[this.state.RegionSelected];
    this.state.Drop = false;
    this.props.onChange({
        Province:this.state.ProvinceSelected_Value,
        City:this.state.CitySelected_Value,
        Region:this.state.RegionSelected_Value
    })
    this.setState(this.state);
}
render() {
  return (
    <div className={style.LocationBox}>
        <div className={[style.LocationValue,'childcenter childcontentstart'].join(' ')} onClick={this.HandleDrop.bind(this,true)}>
            {this.state.ProvinceSelected_Value?this.state.ProvinceSelected_Value+'-'+this.state.CitySelected_Value+'-'+this.state.RegionSelected_Value:<span className={style.PlaceHolder}>{(this.props.placeholder?this.props.placeholder:'请选择所在省市区')}</span>}
        </div>
        {this.state.Drop?<div className={style.DropBox}>
            <div className={style.DropOption}>
                <div className={[style.HandleButtonGroup,'childcenter'].join(' ')}>
                   <div className={[style.ButtonBox,'childcenter childcontentstart'].join(' ')}>
                      <div className={[style.Button,'childcenter'].join(' ')} onClick={this.HandleDrop.bind(this,false)}>取消</div>
                   </div>
                   <div className={[style.ButtonBox,'childcenter childcontentend'].join(' ')}>
                      <div className={[style.Button,'childcenter'].join(' ')} onClick={this.HandleSelect}>确定</div>
                   </div>
                </div>
                <div className={[style.OptionBox,'childcenter'].join(' ')}>
                    <div className={[style.OptionColumn,'childcenter childcolumn'].join(' ')}
                        onTouchStart={this.HandleTouchStart.bind(this,'Province')}
                        onTouchMove={this.HandleTouchMove.bind(this,'Province')}
                        onTouchEnd={this.HandleTouchEnd.bind(this,'Province')}>
                        {this.createProvinceOption()}
                    </div>
                    <div className={[style.OptionColumn,'childcenter childcolumn'].join(' ')}
                        onTouchStart={this.HandleTouchStart.bind(this,'City')}
                        onTouchMove={this.HandleTouchMove.bind(this,'City')}
                        onTouchEnd={this.HandleTouchEnd.bind(this,'City')}>
                        {this.createCityOption()}
                    </div>
                    <div className={[style.OptionColumn,'childcenter childcolumn'].join(' ')}
                        onTouchStart={this.HandleTouchStart.bind(this,'Region')}
                        onTouchMove={this.HandleTouchMove.bind(this,'Region')}
                        onTouchEnd={this.HandleTouchEnd.bind(this,'Region')}>
                        {this.createRegionOption()}
                    </div>
                </div>
            </div>
        </div>:''}
    </div>
   )
   }
}
export default LocationBox