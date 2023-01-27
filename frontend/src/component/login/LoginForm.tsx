import React, {FC, useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const LoginForm: FC = ()=>{

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(<span></span>);
    const emailInput = useRef<HTMLInputElement>(null);
    const pwInput = useRef<HTMLInputElement>(null);

    const onLoginBtn = ()=>{
        if(emailInput.current !== null && pwInput.current !== null)
        fetch("/login",{
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'username':emailInput.current.value,
                'password':pwInput.current.value
            })
        }).then((response)=>{
            if(response.status===200){
                navigate("/");
            }else{
                setErrorMessage(<span style={{color:"red", fontSize:"0.8em"}}>아이디 또는 비밀번호가 일치하지 않습니다.</span>);
            }
        })
    }

    return (
        <form className="login-form" method="post" action="/login">
            <div>
                <h2 className="form-top-title">아이톡 로그인</h2>
            </div>
            <div className="form-tag">
                <p className="tag-name">아이디</p>
                <div className="form-input-back">
                    <input type="text" name="username" className="form-input" ref={emailInput}/>
                </div>
            </div>
            <div className="form-tag">
                <p className="tag-name">비밀번호</p>
                <div className="form-input-back">
                    <input type="password" name="password" className="form-input" ref={pwInput}/>
                </div>
            </div>
            <div>
                {errorMessage}
            </div>
            <div>
                <button type="button" className="login-button" onClick={onLoginBtn}>로그인</button>
                <div style={{margin:'auto'}}>
                    <Link className="help-link" to="/JoinForm">회원가입</Link>
                    <Link className="help-link" to="/SearchPW">비밀번호 찾기</Link>
                </div>
            </div>
        </form>
    );
}

export default LoginForm;