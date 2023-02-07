import React, {useEffect, useRef, useState} from "react";
import CsrfToken from "../util/CsrfToken";

const SearchPw = ()=>{
    const emailForm = useRef<HTMLInputElement>(null);
    const [message,setMessage] =  useState(<span></span>)
    const [csrf, setCsrf] = useState<string>("");


    useEffect(() => { CsrfToken(setCsrf) }, [])

    const onFindBtn = ()=>{
        fetch("/findPw",{
            method:"POST",
            headers: { 'X-CSRF-Token': csrf, 'Content-Type': 'application/json'},
            body:JSON.stringify({username:emailForm.current?.value})
        }).then((response)=>{
            if(response.status === 200){
                setMessage(<span>이메일을 발송했습니다.</span>)
            }else(
                setMessage(<span>이메일을 다시 확인해주세요</span>)
            )
        })
    }

    return(
        <form className="login-form" style={{height:"20rem"}}>
            <h2 style={{color:"black"}}>비밀번호 찾기</h2>
            <div style={{position:"relative"}}>
                <div className="form-tag">
                    <p className="tag-name">이메일</p>
                    <div className="form-input-back">
                        <input type="text" name="username" className="form-input" placeholder="ex) anno123@google.com"
                        ref={emailForm}/>
                    </div>
                </div>
                <div className="validation-message">
                    {message}
                </div>
            </div>
            <button type="button" className="login-button" onClick={onFindBtn}>비밀번호 찾기</button>
        </form>
    );
}

export default SearchPw;