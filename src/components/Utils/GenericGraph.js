import React from 'react';
import CanvasJSReact from '../../canvasjs/canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var greenShades1 = ['#007f5f','#2b9348','#55a630','#80b918','#aacc00','#bfd200','#d4d700','#dddf00','#eeef20','#ffff3f']
var greenShades2 = ['004b23','006400','007200','008000','38b000','70e000','9ef01a','ccff33']
var blueToBlack = ['#b4d1ef','#82b3e4','#4f94d9','#3685d3','#0466c8','#0353a4','#023e7d','#002855','#001845','#001233','#33415c','#5c677d','#7d8597','#979dac','#b6bac5','#cbced6','#eaebee']

var blackToRed = []
for(var i=0;i<400;i++)
{
	var j = Math.floor(i/4); 
	var color = `rgb(${135+j},${j},${j})`
	blackToRed.push(color)
}

var blackToGreen = []
for(i=0;i<400;i++)
{
	j = Math.floor(i/4); 
	color = `rgb(${j},${135+j},${j})`
	blackToGreen.push(color)
}

var blackToBlue = []
for(i=0;i<400;i++)
{
	j = Math.floor(i/4); 
	color = `rgb(${j},${j},${135+j})`
	blackToBlue.push(color)
}



CanvasJS.addColorSet("greenShades1",greenShades1)
CanvasJS.addColorSet("greenShades2",greenShades2)
CanvasJS.addColorSet("blueToBlack",blueToBlack)
CanvasJS.addColorSet("blackToRed",blackToRed)
CanvasJS.addColorSet("blackToGreen",blackToGreen)
CanvasJS.addColorSet("blackToBlue",blackToBlue)

export function GenericGraph(props){
		
	return (
		<div>
			<CanvasJSChart options = {props.options}/>
		</div>
	);
	
}
