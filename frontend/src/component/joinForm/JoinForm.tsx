import React, {FormEvent, useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import EmailInput from "./formInputs/EmailInput";
import NicknameInput from "./formInputs/NicknameInput";
import PwInput from "./formInputs/PwInput";
import CsrfToken from "../util/CsrfToken";

const JoinForm = () =>{
    const navigate = useNavigate();

    const isValidEmail = useRef(false);
    const isValidNickname = useRef(false);
    const isValidPw = useRef(false);
    const isValidPwCheck = useRef(false);

    const [csrf,setCsrf]  = useState<string>("");

    useEffect(()=>{
        CsrfToken(setCsrf);
    },[])

    const onSubmit = (event: FormEvent<HTMLFormElement>)=>{
        if(!isValidEmail.current || !isValidNickname.current
            || !isValidPw.current || !isValidPwCheck.current || csrf === ""){
            event.preventDefault();
        }
    }


    return(
        <form className="text-start" method="post" action="/doJoin" onSubmit={onSubmit}>
            <h1 className="text-center">아이톡 회원가입</h1>
            <input type="hidden" value={csrf} name="_csrf"/>

            <EmailInput isValidEmail={isValidEmail}/>
            <NicknameInput isValidNickname={isValidNickname}/>
            <PwInput isValidPwInput={isValidPw} isValidPwCheck={isValidPwCheck} />

            <div className="mt-2">
                <a className="btn btn-primary btn-sm" onClick={ ()=>navigate(-1) }>뒤로가기</a>
                <button className="btn btn-primary btn-sm" style={{float:"right"}}>회원가입 하기</button>
            </div>
        </form>
    )
}

export default JoinForm;