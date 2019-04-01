import React, { Component } from 'react'
import style from './ParticleFlowBox.scss'

function Line(x, y, _x, _y, o) {
    this.beginX = x,
        this.beginY = y,
        this.closeX = _x,
        this.closeY = _y,
        this.o = o;
}

//点：圆心xy坐标，半径，每帧移动xy的距离
function Circle(x, y, r, moveX, moveY) {
    this.x = x,
        this.y = y,
        this.r = r,
        this.moveX = moveX,
        this.moveY = moveY;
}
let pointerArray=[];
let MouseX=null;
let MouseY=null;
export class ParticleFlowBox extends Component {
constructor(props) {
  super(props);
  this.state = {
    winWidth:null,
    winHeight:null,
    PointerNum:190,
  };
    this.refreshProps = this.refreshProps.bind(this);
    this.getWindowSize = this.getWindowSize.bind(this);
    this.drawCricle = this.drawCricle.bind(this);
    this.drawLine = this.drawLine.bind(this);
    this.animationUpdate = this.animationUpdate.bind(this);
    this.InitAnimation = this.InitAnimation.bind(this);
    this.randomnum = this.randomnum.bind(this);
    this.listenerMouse = this.listenerMouse.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  //获取视窗大小
  this.getWindowSize();
  //监听鼠标坐标
  window.addEventListener('mousemove',this.listenerMouse);
  window.addEventListener('resize',this.getWindowSize)
  //初始化动画
  this.InitAnimation();

}
listenerMouse(e){
    MouseX = e.clientX;
    MouseY = e.clientY;
}
componentWillUnmount(){
    window.removeEventListener('mousemove',this.listenerMouse);
}
refreshProps(props) {
  
}
getWindowSize(){
    this.state.winWidth = window.innerWidth;
    this.state.winHeight = window.innerHeight;
    this.setState(this.state);
}
// 绘制原点
drawCricle(cxt, x, y, r, moveX, moveY) {
    // let canvas = document.createElement('canvas');
    // canvas.width = r + 30;
    // canvas.height = r + 30;
    // let tmp_cxt = canvas.getContext('2d');

    var circle = new Circle(x, y, r, moveX, moveY)
    
    // tmp_cxt.fillStyle = circle.color?circle.color:'rgba(191,250,255,1)';
    // tmp_cxt.beginPath()
    // tmp_cxt.filter = 'blur(4px)';
    // tmp_cxt.arc(canvas.width/2, canvas.height/2, circle.r, 0, 2 * Math.PI)
    // tmp_cxt.closePath()
    // tmp_cxt.fill();
    // let circlebase = canvas.toDataURL( 'image/png', 1 );
    

    
    cxt.fillStyle = circle.color?circle.color:'rgba(191,250,255,1)';
    cxt.beginPath()
    // let img = new Image();
    // img.src = circlebase;
    // cxt.drawImage(img, circle.x - canvas.width/2, circle.y - canvas.height/2);
    cxt.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI)
    cxt.closePath()
    cxt.fill();
    return circle;
}
//绘制线条
drawLine(cxt, x, y, _x, _y, o) {
    var line = new Line(x, y, _x, _y, o)
    cxt.beginPath()
    cxt.lineWidth=1;
    
    cxt.strokeStyle = 'rgba(191,250,255,' + o + ')'
    cxt.moveTo(line.beginX, line.beginY)
    cxt.lineTo(line.closeX, line.closeY)
    cxt.closePath()
    cxt.stroke();
}
InitAnimation(){
    
    if (this.refs.canvasbox) {
        let cxt = this.refs.canvasbox.getContext('2d');
        pointerArray = [];
        for (let z = 0; z < this.state.PointerNum; z++) {
            let pointer = this.drawCricle(cxt, this.randomnum(this.state.winWidth), this.randomnum(this.state.winHeight), 4/*this.randomnum(15,5)*/, this.randomnum(10, -10) / 40, this.randomnum(10, -10) / 40);
            pointerArray.push(pointer);
        }
    }
    this.animationUpdate();
}
animationUpdate(){
    if (this.refs.canvasbox) {
        let cxt = this.refs.canvasbox.getContext('2d');
        cxt.filter = 'none';
        cxt.clearRect(0, 0, this.refs.canvasbox.width, this.refs.canvasbox.height);
        for (let i = 0; i < pointerArray.length; i++) {
            let pointer = pointerArray[i]
            this.drawCricle(cxt, pointerArray[i].x, pointerArray[i].y, pointerArray[i].r);
            pointer.x += pointer.moveX;
            pointer.y += pointer.moveY;
            if(pointer.x > this.state.winWidth) pointer.x = 0;
            else if(pointer.x < 0) pointer.x = this.state.winWidth;
            if(pointer.y > this.state.winHeight) pointer.y = 0;
            else if(pointer.y < 0) pointer.y = this.state.winHeight;
        }
        for(var i = 0; i < pointerArray.length; i++) {
            for(var j = 0; j < pointerArray.length; j++) {
                if(i + j < pointerArray.length) {
                    var A = Math.abs(pointerArray[i + j].x - pointerArray[i].x),
                        B = Math.abs(pointerArray[i + j].y - pointerArray[i].y);
                    var lineLength = Math.sqrt(A * A + B * B);
                    // var C = 1 / lineLength * 7 - 0.009;
                    var lineOpacity = lineLength>100?0:(1-lineLength/100);
                    if(lineOpacity > 0) {
                        this.drawLine(cxt, pointerArray[i].x, pointerArray[i].y, pointerArray[i + j].x, pointerArray[i + j].y, lineOpacity);
                    }
                }
            }
            var A = Math.abs(MouseX - pointerArray[i].x),
                B = Math.abs(MouseY - pointerArray[i].y);
            var lineLength = Math.sqrt(A * A + B * B);
            var C = 1 / lineLength * 7 - 0.009;
            var lineOpacity = lineLength>200?0:(1-lineLength/200);
            if(lineOpacity > 0) {
                this.drawLine(cxt, pointerArray[i].x, pointerArray[i].y, MouseX, MouseY, lineOpacity);
            }
        }
        
        requestAnimationFrame(this.animationUpdate);
    }else{
        requestAnimationFrame(this.animationUpdate);
    }
    
}
//生成max和min之间的随机数
randomnum(max, _min) {
    var min = arguments[1] || 0;
    return Math.floor(Math.random() * (max - min + 1) + min);
}
render() {
  return (
    <div className={style.ParticleFlowBox}>
        <canvas ref='canvasbox' width={this.state.winWidth} height={this.state.winHeight}></canvas>
    </div>
   )
   }
}
export default ParticleFlowBox