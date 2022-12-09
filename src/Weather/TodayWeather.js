import axios from "axios"
import NowWeather from "./NowWeather"
import WeatherDisplay from "./WeatherDisplay"
import WeatherAlgorithm from "./WeatherAlgorithm"
import React,{useEffect,useState,useTransition,useDeferredValue } from "react"
import "./TodayWeather.moudule.css"

const temp = (...rest) => {
    const dateValue = new Date()
    const  array = rest[0].map((R)=>{
const value = new Date(R.dt*1000);
    return dateValue.getDate()!==value.getDate()?null:R.temp })
  const data = array.filter(E=>E!==null)
  const hotdata = Math.max.apply(null,data)
  const colddata = Math.min.apply(null,data)
  rest[1](hotdata)
  rest[2](colddata)
  rest[3](false)}

const rain = (...rest) => {
    const dateValue = new Date()
    const rainning =
    rest[0].map((R)=>{
   const value = new Date(R.dt*1000);
      return dateValue.getDate()!==value.getDate()?null:R.rain??null })
      const rainData = rainning.filter(E=>E!==null);
      (rainData.length!==0)? rest[1](true): rest[1](false)
}

const TodayWeather = ( {latitude,longitude,setDate}) =>{
    const [weatherObject,setWeatherObject] = useState([])
    const [rainData,setRainData] = useState(false)
    const [lowTemp,setLowTemp] = useState(0)
    const [highTemp,setHighTemp] = useState(0)
    const [pageLoading,setPageLoading] = useState(true)
    const [isPending,startTransition] = useTransition()
    const weatherState = useDeferredValue(weatherObject)

    useEffect(()=>{try{
        startTransition(
         async() => {if(!!latitude&&!!longitude){
        setWeatherObject(
        await(await axios(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WHEATHER_API_KEY}&units=metric`)
        ).data.hourly)}})}catch(e){console.log(e)}},[latitude,longitude])

    useEffect(() => {
        if(!!weatherState.length){
            temp(weatherState,setHighTemp,setLowTemp,setPageLoading)
            rain(weatherState,setRainData)}},[weatherState])
    return (
                <>{isPending?
                <><h1>loading.....</h1></>
                :pageLoading?<><h1>오늘의 날씨</h1></>:
                <div className={"TodayWeather_container"}>
                <NowWeather latitude={latitude} longitude = {longitude} setDate={setDate}/>
                {weatherState.map(R=>
                <WeatherDisplay key={R.dt} dt={R.dt} humidity={R.humidity}
                temp={R.temp} weather={R.weather}/>)}
                <WeatherAlgorithm Htemp = {Math.round(highTemp)} 
                Mtemp={Math.round(lowTemp)} rain={rainData}/></div>}</>)}
        export default React.memo(TodayWeather)
