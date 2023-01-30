import React, {FormEvent, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
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
        <form className="login-form" method="post" action="/join" onSubmit={onSubmit}>
            <div>
                <h2 className="form-top-title">
                    아이톡 회원가입
                </h2>
            </div>
            <input type="hidden" value={csrf} name="_csrf"/>
            <EmailInput isValidEmail={isValidEmail}/>
            <NicknameInput isValidNickname={isValidNickname}/>
            <PwInput isValidPwInput={isValidPw} isValidPwCheck={isValidPwCheck} />

            <div>
                <button type="button" className="help-link" onClick={ ()=>navigate(-1) }> 뒤로가기 </button>
                <button className="help-link">회원가입 하기</button>
            </div>
        </form>
    )
}

export default JoinForm;