import React,{useState} from "react";
import { Stage, Layer, Rect, Text } from 'react-konva';

function ColoredRect(){
  const pieces = [];
  const n=6;
  var rectObj={};

  var frameValues={
    x:[20,360],
    y:[20,20],
    width:[150,150],
    height:[150,150],
    color:[],
  };
  var pieceValues={
    x:[220,225],
    y:[120,125],
    width:50,
    height:50,
    color:["blue","red"],
  };
   
  function handleCaptchaCheck(){
  let placedCount=0;
  for(let key in rectObj){
    if(rectObj[key]==true){
      placedCount+=1;
    }
  }

  if(placedCount==n){
    console.log("SUCCESS");
  }
}

  function handleDrag(e){

    var targetObj={
      x:e.target.attrs.x,
      y:e.target.attrs.y,
      width:e.target.attrs.width,
      height:e.target.attrs.height,
    }
    var frameObj ={};
    var Box1={
      x:20,
      y:20,
      width:150,
      height:150
    }
    var Box2={
      x:360,
      y:20,
      width:150,
      height:150
    }
    if(e.target.attrs.fill=="red"){
      frameObj=Box1;
    }
    else{
      frameObj=Box2;
    }
    if (rectIntersect(targetObj.x, targetObj.y, targetObj.width, targetObj.height, frameObj.x, frameObj.y, frameObj.width, frameObj.height)){
      rectObj[e.target.attrs.id]=true;

    }else{
      rectObj[e.target.attrs.id]=false;
    }
  }

  function  rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
        return false;
    }
    return true;
  }

  for (var i=0;i<n;i++) {
   var rectID="rect"+i;
   rectObj={...rectObj,[rectID]:false};
    pieces.push( 
              <Rect id={rectID} x={pieceValues.x[i%2]}  y={pieceValues.y[i%2]}  width={pieceValues.width}  height={pieceValues.height} 
                fill={pieceValues.color[i%2]}  draggable={true} onMouseUp={handleDrag} shadowBlur={5} />
      )
  }
  return (
    <div className="canvas">
    <Stage width={"600"} height={"200"}>
    <Layer>
      <Rect x={20} y={20} width={150}  height={150} stroke="red" shadowBlur={5} />
      <Rect x={360}  y={20}  width={150}  height={150} stroke="blue" shadowBlur={5} />
      {pieces}
    </Layer>
    </Stage>
    <button className="done-btn" onClick={handleCaptchaCheck}>Done</button>
    </div>
  );
  }
  export default ColoredRect;