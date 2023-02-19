import React, {CSSProperties, FC, useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import CsrfToken from "../util/CsrfToken";

const LoginForm: FC = ()=>{

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(<span></span>);
    const emailInput = useRef<HTMLInputElement>(null);
    const pwInput = useRef<HTMLInputElement>(null);
    const [csrf, setCsrf] = useState<string>("");

    const style_HelpLink: CSSProperties = {
        display: "inline-block",
        fontSize: "1rem",
        margin: "0rem 1rem",
        width: "10rem",
        textDecoration: "none",
    }

    useEffect(() => {
            CsrfToken(setCsrf)
        }
        , [])

    const onLoginBtn = ()=>{
        if(emailInput.current !== null && pwInput.current !== null && csrf !== undefined)
        fetch("/login",{
            method: "POST",
            headers: {
                'X-CSRF-Token': csrf,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'username':emailInput.current.value,
                'password':pwInput.current.value
            })
        }).then((response)=>{
            if(response.status===200){
                navigate("/");
            }else if(response.status === 401){
                setErrorMessage(<span style={{color:"red", fontSize:"0.8em"}}>아이디 또는 비밀번호가 일치하지 않습니다.</span>);
            }
        })
    }
    const onKeyDown = (event :React.KeyboardEvent<HTMLInputElement>)=>{
        if (event.key === "Enter"){
            if (!event.nativeEvent.isComposing){
                onLoginBtn();
            }
        }
    }
    return (
        <form>
            <h2>아이톡 로그인</h2>
            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                       name="username" ref={emailInput}
                       onKeyDown={(event)=>{onKeyDown(event)}}/>
                <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                       name="password" ref={pwInput}
                       onKeyDown={(event)=>{onKeyDown(event)}}/>
                <label htmlFor="floatingPassword">Password</label>
            </div>
            <div>
                {errorMessage}
            </div>
            <div>
                <button type="button" className="btn btn-primary" style={{display:"block", margin:"0.5rem 0", width:"100%"}} onClick={onLoginBtn}>로그인</button>
                <div style={{margin:'auto'}}>
                    <Link style={style_HelpLink} to="/JoinForm">회원가입</Link>
                    <Link style={style_HelpLink} to="/SearchPW">비밀번호 찾기</Link>
                </div>
            </div>
        </form>
    );
}

export default LoginForm;