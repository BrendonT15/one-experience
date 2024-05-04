import "./HeroImgStyles7.css";
import React, {useEffect, useRef} from 'react';
import { Link } from "react-router-dom";
import TextBox from "./TextBox.js";
import gsap from "gsap";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

import winter from "../assets/winter.jpg";
import fog_4 from "../assets/fog_4.png";
import snowfall from "../assets/snowfall.png";
function HeroImg7() {
  const fog_left_ref = useRef(null);
  const fog_right_ref = useRef(null);
  const snow_ref = useRef(null);
  const bg_img_ref = useRef(null);

  let timeline = gsap.timeline();

  useEffect(() => {
    const handleMouseMove = (e) => {
        const parallax_el = document.querySelectorAll(".parallax");

        let xValue = 0;
        let yValue = 0;

        let rotateDegree = 0;

        if(timeline.isActive()) return;

        xValue = (e.clientX - window.innerWidth/2)/2;
        yValue = (e.clientY - window.innerHeight/2)/2;

        parallax_el.forEach((el) => {
            let speedx = el.dataset.speedx;
            let speedy = el.dataset.speedy;

            let rotation = el.dataset.rotation;

            rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

            el.style.transform = `rotateY(${rotateDegree * rotation}deg) translateX(calc(-50% + ${-xValue * speedx}px)) translateY(calc(-50% + ${yValue * speedy}px))`;
        })
    }
    
    handleMouseMove({ clientX: 0, clientY: 0});

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  useEffect(() => {
  if(bg_img_ref.current){
    timeline.from(bg_img_ref.current, {
        y: -400,
        duration: 5,
        ease: "power3.out",
    })
}

  if(fog_left_ref.current && fog_right_ref.current){
    timeline.to(fog_left_ref.current, {
        x: -2750,
        duration: 6,
        ease: "power2.out",
    }, "0")
    .to(fog_right_ref.current, {
        x: 2750,
        duration: 6,
        ease: "power2.out",
    }, "0").from(".hide", {
      opacity: 0,
      duration: 0.50,
    });
  };

  if(snow_ref.current){
    timeline.from(snow_ref.current, {
      opacity: 0,
      duration: 0.50,
    });
  };
});

  return (
    <div className="hero">
        <div className="mask_7">
            <div className="vignette hide"></div>
            <img className="parallax winter" ref={bg_img_ref} src={winter} data-speedx="0.15" data-speedy="0.15" data-rotation="0" alt="background"/>
            <img className="parallax snowfall" ref={snow_ref} style={{opacity:1}} src={snowfall} data-speedx="0.12" data-speedy="0.085" data-rotation="0.345" alt="snow"/>
            <TextBox title="Winter Sorrows" text={`Tread through the harsh Winter cold,
            Where frost-laced winds hinder your path,
            A season filled with hardships,
            Yet from its depths, new strengths grow
            Persevere and navigate nature's obstacles,
            For suffering is innate,
            Stay resilient and true,
            Shape your soul and understand being,
            The path does not betray you,
            Do not falter as the path is beneath you,
            Tread the path and flatten the snow, 
            Overcome the hardships and widen the path,
            Your truth awaits...
            `}/>
            <img className="fog_left" ref={fog_left_ref} src={fog_4} alt="fog_left"/>
            <img className="fog_right" ref={fog_right_ref} src={fog_4} alt="fog_right"/>
            <div className="arrow_up hide">
                <Link to="/page-eight" className="arrow-link"><FaAngleUp size={40}/></Link>
            </div>
            <div className="arrow_down hide">
                <Link to="/page-six" className="arrow-link"><FaAngleDown size={40}/></Link>
            </div>
        </div>
    </div>
  )
}

export default HeroImg7;