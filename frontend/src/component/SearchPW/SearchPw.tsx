import React, {useEffect, useRef, useState} from "react";
import CsrfToken from "../util/CsrfToken";

const SearchPw = ()=>{
    const emailForm = useRef<HTMLInputElement>(null);
    const [csrf, setCsrf] = useState<string>("");
    const [validCss,setValidCss] = useState<string>("");
    const [validMessage, setValidMessage] = useState<string>("이메일 발송중");


    useEffect(() => { CsrfToken(setCsrf) }, [])

    const onFindBtn = ()=>{
        setValidCss("is-valid");
        setValidMessage("이메일 확인 중...");
        fetch("/findPw",{
            method:"POST",
            headers: { 'X-CSRF-Token': csrf, 'Content-Type': 'application/json'},
            body:JSON.stringify({username:emailForm.current?.value})
        }).then((response)=>{
            if(response.status === 200){
                setValidCss("is-valid")
                setValidMessage("해당 이메일로 비밀번호 변경 링크를 발송했습니다.")
            }else(
                setValidCss("is-invalid")
            )
        })
    }

    return(
        <div>
            <h2>비밀번호 찾기</h2>
            <div style={{textAlign:"left"}}>
                <label className="form-label mt-1 text-start" htmlFor="nicknameForm" style={{fontSize:"1.2rem"}}>이메일 입력</label>
                <input type="text" name="nickname" placeholder="이메일 주소를 입력해주세요." className={"form-control "+validCss} id="nicknameForm"
                style={{width:"20rem"}} ref={emailForm}/>
                <div className="invalid-feedback" style={{fontSize:"1rem"}}>회원정보를 찾을 수 없습니다.</div>
                <div className="valid-feedback"  style={{fontSize:"1rem"}}>{validMessage}</div>
            </div>
            <button type="button" className="btn btn-sm mt-2" onClick={onFindBtn}>비밀번호 찾기</button>
        </div>
    );
}

export default SearchPw;