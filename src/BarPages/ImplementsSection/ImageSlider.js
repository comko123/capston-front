import { useState,useRef } from "react"
import {wheather} from "../../data"
import SliderButton from "./SliderButton"
import ImageList from "./ImageList"
const left = (num) => num-100
const right = (num) => num+100

const umbrella = () => <div className="Recommendation_notice1"
style={wheather.rain?{backgroundColor:"#4254FF",color:"white"}:
{color:"#4254FF",border:"2px solid #4254FF",backgroundColor:"white"}}>우산필요</div>

const ImageSlider = ({regis}) => {
const moveRef = useRef()    
const [constant,setConstant] = useState(0)
return(<div className={"Recommendation_card_container " + 
(sessionStorage.getItem("login_information")? "": "InfoToWeather_card_container")}>
<div className="Recommendation_card_container_inner_Box" ref={moveRef}  >
<div className={"Recommendation_card_container_inner"}
style={{marginLeft:"1.2vw",marginRight:"3vw"}}>
<ImageList regis={regis} number={0}/>
<div className="Recommendation_notice">{umbrella()}</div></div>
<div className={"Recommendation_card_container_inner"} style={{marginLeft:"2vw"}}>
<ImageList regis={regis} number={1}/>
<div className="Recommendation_notice">{umbrella()}</div></div></div>
<SliderButton className="leftButton" optionConstant={!constant} direction={right}
setConstant={setConstant} currentConstant={constant} text="&larr;"moveRef={moveRef}/>
<SliderButton className="rightButton" optionConstant={!!constant} direction={left}
setConstant={setConstant}currentConstant={constant} text="&rarr;" moveRef={moveRef}/></div>)}
export default ImageSlider