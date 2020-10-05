import React,{useState} from "react";
import { Stage, Layer, Rect, Text } from 'react-konva';
import {Button} from "react-bootstrap";

function ColoredRect(props){
  const pieces = [];
  const colorsCollection=["blue","green","red","yellow","black","white"];
  var colors = colorsCollection
            .sort(function() { return .5 - Math.random() }) 
            .slice(0, 2); 
  const n=6;
  var rectObj={};

  var frameValues={
    x:[20,360],
    y:[20,20],
    width:[150,150],
    height:[150,150],
    color:colors,
  };
  var pieceValues={
    x:[220,225],
    y:[120,125],
    width:50,
    height:50,
    color:colors,
  };
   
  function handleCaptchaCheck(){
  let placedCount=0;
  for(let key in rectObj){
    if(rectObj[key]==true){
      placedCount+=1;
    }
  }

  if(placedCount==n){
    props.handleClose();
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
    var frame1={
      x:frameValues.x[0],
      y:frameValues.y[0],
      width:frameValues.width[0],
      height:frameValues.width[0],
      color:frameValues.color[0]
    }
    var frame2={
      x:frameValues.x[1],
      y:frameValues.y[1],
      width:frameValues.width[1],
      height:frameValues.width[1],
      color:frameValues.color[1]
    }
    if(e.target.attrs.fill==frame1.color){
      frameObj=frame1;
    }
    else if(e.target.attrs.fill==frame2.color){
      frameObj=frame2;
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
    <Stage width={600} height={200}>
    <Layer>
      <Rect x={frameValues.x[0]} y={frameValues.y[0]} width={frameValues.width[0]}  height={frameValues.height[0]} 
          stroke={frameValues.color[0]} shadowBlur={5} />
      <Rect x={frameValues.x[1]} y={frameValues.y[1]} width={frameValues.width[1]}  height={frameValues.height[1]} 
          stroke={frameValues.color[1]} shadowBlur={5} />
      {pieces}
    </Layer>
    </Stage>
    <Button variant="secondary" className="done-btn" onClick={handleCaptchaCheck}>
            Done
    </Button>

    </div>
  );
  }
  export default ColoredRect;