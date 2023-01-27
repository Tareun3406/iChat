import React, {FC, useRef} from "react";
import {Link} from "react-router-dom";

const LoginForm: FC = ()=>{

    const emailInput = useRef<HTMLInputElement>(null);
    const pwInput = useRef<HTMLInputElement>(null);

    const loginBtn = ()=>{
        fetch("/login",{
            method: "POST",
            body: JSON.stringify({
                username: emailInput.current?.value,
                password: pwInput.current?.value
            })
        }).then((response)=>{
            console.log(response);
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
                <button className="login-button" type="button" onClick={loginBtn}>로그인</button>
                <div style={{margin:'auto'}}>
                    <Link className="help-link" to="/JoinForm">회원가입</Link>
                    <Link className="help-link" to="/SearchPW">비밀번호 찾기</Link>
                </div>
            </div>
        </form>
    );
}

export default LoginForm;