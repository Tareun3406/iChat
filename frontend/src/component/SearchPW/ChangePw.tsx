import React, {useEffect, useState} from "react";

const ChangePw = ()=>{

    const exp = /^[a-zA-Z0-9~!@#$%^&*()]{8,32}$/
    const [pwValue, setPwValue] = useState("");
    const [pwCheckValue, setPwCheckValue] = useState("");

    const [cssPwIsValid, setCssPwIsValid] = useState("");
    const [cssPwCheckIsValid, setCssPwCheckIsValid] = useState("");

    const [pwBlankDivCss, setPwBlankDivCss] = useState({height:"1.75rem"});
    const [pwCheckBlankDivCss, setPwCheckBlankDivCss] = useState({height:"1.75rem"});

    const [isValidPwInput, setIsValidPwInput] = useState<boolean>(false);
    const [isValidPwCheck, setIsValidPwCheck] = useState<boolean>(false);



    useEffect(()=>{
        if(pwValue !== ""){
            if (exp.test(pwValue)) {
                setCssPwIsValid("is-valid");
                setIsValidPwInput(true);
                setPwBlankDivCss({height: "0"});
            }
            else {
                setCssPwIsValid("is-invalid");
                setIsValidPwInput(false);
                setPwBlankDivCss({height: "0"});

            }
        }else{
            setCssPwIsValid("");
            setIsValidPwInput(false);
            setPwBlankDivCss({height: "1.75rem"});
        }
    },[pwValue])

    useEffect(()=>{
        if(pwCheckValue !== ""){
            if (pwValue === pwCheckValue && pwCheckValue !== "") {
                setCssPwCheckIsValid("is-valid");
                setPwCheckBlankDivCss({height: "0"});
                setIsValidPwCheck(true);
            }
            else {
                setCssPwCheckIsValid("is-invalid");
                setPwCheckBlankDivCss({height: "0"});
                setIsValidPwCheck(false);
            }
        }else {
            setCssPwCheckIsValid("");
            setPwCheckBlankDivCss({height: "1.75rem"});
            setIsValidPwCheck(false);
        }
    },[pwValue,pwCheckValue])


    const onClick = ()=>{
        // fetch("/findPw",{
        //     method:"POST",
        //     headers: {'Content-Type': 'application/json'},
        //     body:JSON.stringify({username:emailForm.current?.value})
        // }).then((response)=>{
        //     if(response.status === 200){
        //         setValidCss("is-valid")
        //         setValidMessage("해당 이메일로 비밀번호 변경 링크를 발송했습니다.")
        //     }else(
        //         setValidCss("is-invalid")
        //     )
        // })
    }
    return(
        <>
            <div style={{width:"20rem"}}>
                <label className="form-label mt-1 text-start" htmlFor="pwForm" style={{fontSize:"1.2rem"}}>비밀번호</label>
                <input type="password" name="password" placeholder="8~32자의 영문,숫자,특문" className={"form-control "+cssPwIsValid} id="pwForm"
                       value={pwValue} onChange={(event)=>{setPwValue(event.target.value)}} />
                <div className="invalid-feedback" style={{fontSize:"1rem"}}>사용할 수 없는 비밀번호 입니다.</div>
                <div className="valid-feedback"  style={{fontSize:"1rem"}}>사용가능한 비밀번호 입니다.</div>
                <div style={pwBlankDivCss}/>
            </div>

            <div style={{width:"20rem"}}>
                <label className="form-label mt-1 text-start" htmlFor="pwCheckForm" style={{fontSize:"1.2rem"}}>비밀번호 확인</label>
                <input type="password" name="pwCheck" placeholder="비밀번호를 다시 입력해주세요." className={"form-control "+cssPwCheckIsValid} id="pwCheckForm"
                       value={pwCheckValue} onChange={(event)=>{setPwCheckValue(event.target.value)}}/>
                <div className="invalid-feedback" style={{fontSize:"1rem"}}>비밀번호가 일치하지 않습니다.</div>
                <div className="valid-feedback"  style={{fontSize:"1rem"}}>비밀번호가 일치합니다.</div>
                <div style={pwCheckBlankDivCss}/>
            </div>
            <div>
                <button type="button">비밀변호 변경하기</button>
            </div>
        </>
    )
}

export default ChangePw;