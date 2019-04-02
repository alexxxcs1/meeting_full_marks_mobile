import React, { Component } from 'react'
import style from './MeetingView.scss'
import {api} from 'common/app'

import meetinginfoicon3 from 'assets/meetinginfoicon3.png'
import meetinginfoicon6 from 'assets/meetinginfoicon6.png'
import meetinginfoicon5 from 'assets/meetinginfoicon5.png'
  
export class MeetingView extends Component {
constructor(props) {
  super(props);
  this.state = {
    id:null,
    IntroduceOption:{
        show:false,
        content:null,
    },
    meetinginfo:null,
  };
  this.refreshProps = this.refreshProps.bind(this);
  this.getMeetingInfo = this.getMeetingInfo.bind(this);
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
      this.getMeetingInfo(params.id);
    }
}
getMeetingInfo(id){
    api.getMeetingInfo(id).then(res=>{
        console.log(res);
        if (res.code === 200) {
            this.state.meetinginfo = res.result;
            this.setState(this.state);
        }else{
            alert(res.message);
        }
    },err=>{
        console.log(err);
        
    })
}
CompileContent(source){
    const regex = /:([1-9]\d*|0)(.\d*)?px/g;
    let relpacearray = source.match(regex);
    if (!relpacearray) return source;
    for (let z = 0; z < relpacearray.length; z++) {
        const element = relpacearray[z];
        let ex_one = element.replace(':',' ')
        let ex_two = ex_one.replace('px',' ')
        let number = parseInt(ex_two);
        let remnumber = (number/75).toFixed(4);
        source = source.replace(element,':'+remnumber+'rem');
    }
    return source;
}
render() {
  return (
    <div className={style.MeetingView}>
        {this.state.IntroduceOption.show?(<MeetingIntroduce content={this.state.IntroduceOption.content} return={(()=>{
            this.setState({
                IntroduceOption:{
                    show:false,
                    content:null,
                }
            })
        }).bind(this)}/>):''}
        <div className={style.MeetingKV}>
            <img src={this.state.meetinginfo?this.state.meetinginfo.cover:''} alt=""/>
        </div>
        <div className={[style.ContentBox,'childcenter childcolumn childcontentstart'].join(' ')}>
            <div className={style.MeetingNameBox}>
                {this.state.meetinginfo?this.state.meetinginfo.title:'加载中...'}
            </div>
            {this.state.meetinginfo?<div className={[style.MeetingIconBox,'childcenter childcontentstart'].join(' ')}>
                {this.state.meetinginfo.content?<div className={style.IconBox} onClick={(()=>{
                    this.setState({
                        IntroduceOption:{
                            show:true,
                            content:this.CompileContent(this.state.meetinginfo.content),
                        }
                    })
                }).bind(this)}>
                    <div className={[style.IconImage,'childcenter'].join(' ')} >
                        <img src={meetinginfoicon3} alt=""/>
                    </div>
                    <div className={[style.IconName,'childcenter'].join(' ')}>
                        会议简介
                    </div>
                </div>:''}
                {this.state.meetinginfo.schedule?<div className={style.IconBox} onClick={()=>{window.location.href=this.state.meetinginfo.schedule}}>
                    <div className={[style.IconImage,'childcenter'].join(' ')}>
                        <img src={meetinginfoicon6} alt=""/>
                    </div>
                    <div className={[style.IconName,'childcenter'].join(' ')}>
                        会议日程
                    </div>
                </div>:''}
                {this.state.meetinginfo.speaker?<div className={style.IconBox} onClick={()=>{window.location.href=this.state.meetinginfo.speaker}}>
                    <div className={[style.IconImage,'childcenter'].join(' ')}>
                        <img src={meetinginfoicon5} alt=""/>
                    </div>
                    <div className={[style.IconName,'childcenter'].join(' ')}>
                        讲者介绍
                    </div>
                </div>:''}
            </div>:''}
        </div>
    </div>
   )
   }
}

class MeetingIntroduce extends Component{
    constructor(props){
        super(props);
        this.state={};
        this.refreshProps = this.refreshProps.bind(this);
    }
    componentDidMount(){
        this.refreshProps(this.props);
    }
    componentWillReceiveProps(nextprops){
        this.refreshProps(nextprops);
    }
    refreshProps(props){
        this.state.content = props.content;
        this.setState(this.state);
    }
    render(){
        return (
            <div className={style.IntroduceBox} >
                <div className={style.Content} dangerouslySetInnerHTML={{__html:this.state.content}}></div>
                <div className={style.ReturnButton} onClick={this.props.return}></div>
            </div>
        )
    }
}

export default MeetingView