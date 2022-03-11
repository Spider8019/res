import React from "react";
import dynamic from 'next/dynamic'

const Sketch = dynamic(() => import("react-p5").then((mod) => {
    // importing sound lib ONLY AFTER REACT-P5 is loaded
    require('p5/lib/addons/p5.sound');
    // returning react-p5 default export
    return mod.default
}), {
    ssr: false
});

let x = 50;
let y = 50;
let song;
let amp;

function togglePlaying(){
    if(song.isPlaying()){
        song.pause()
    }else{
        song.play()
    }
 }

const Index = ({srcUrl}) => {


    const preload = (p5) => {
		p5.soundFormats('mp3', 'ogg');
		song = p5.loadSound(srcUrl);
	};
	const setup = (p5, canvasParentRef) => {
		p5.createCanvas(500, 500).parent(canvasParentRef);
        p5.background(230);
        amp=new p5.constructor.Amplitude()
        p5.soundFormats('mp3', 'ogg');
		song = p5.loadSound(srcUrl);
	};

	const draw = (p5) => {
        p5.fill(120)
        p5.background(255)
        var vol =amp.getLevel()
        var diam = p5.map(vol,0,0.9,100,300);
        p5.circle(50,50,diam,diam);
	};
	return <>
    <Sketch 
    setup={setup} draw={draw} preload={preload}/>
    </>
};

export default Index




