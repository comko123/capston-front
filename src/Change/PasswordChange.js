import axios from "axios"
import {useState,useRef} from "react"
import {useNavigate} from "react-router-dom"
import {changePassword} from "../data"
import { useAlert } from "../hooks/useAlert"
import "./PasswordChange.moudule.css"

export default function PasswordChange() {
    const [result, setResult] = useState({})
    const [emailRef,passwordRef,newPasswordRef] = [useRef(),useRef(),useRef()]
    const navigate = useNavigate()
   useAlert(result,'/')
    return (
        <><div className={"IdFind_title_container"}>
        <h1 className={"IdFind_title"}>비밀번호 변경하기</h1>
        <form className="passwordChangeForm" onSubmit={e=>{(async () =>{
        e.preventDefault()
        const changeInfo = new changePassword(emailRef.current.value,
        passwordRef.current.value,newPasswordRef.current.value)
        try{setResult((await axios.post(`/change-password`,changeInfo)).data)} 
        catch(e){console.log(e)}})()}}>
        <input className="PW" type = "text" placeholder="e-mail" ref={emailRef}/>
        <input className="PW" type = "password" placeholder="password" ref={passwordRef}/>
        <input className="PW" type = "password" placeholder="new password" ref={newPasswordRef}/>
        <div className="passwordChangeButtonList"><input type = "button" 
        value="뒤로가기" className="passWordSubmit" onClick={()=>navigate(-1)}/>
        <input type = "submit" value = "submit" className="passWordSubmit"/></div>
        </form></div></>)}