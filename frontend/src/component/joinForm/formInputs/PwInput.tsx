import React, {MutableRefObject, useEffect, useState} from "react";

interface props{
    isValidPwInput: MutableRefObject<boolean>;
    isValidPwCheck: MutableRefObject<boolean>;
}
const PwInput = (props: props)=>{

    const exp = /^[a-zA-Z0-9~!@#$%^&*()]{8,32}$/
    const [pwValue, setPwValue] = useState("");
    const [pwCheckValue, setPwCheckValue] = useState("");

    const [cssPwIsValid, setCssPwIsValid] = useState("");
    const [cssPwCheckIsValid, setCssPwCheckIsValid] = useState("");

    const [pwBlankDivCss, setPwBlankDivCss] = useState({height:"1.75rem"});
    const [pwCheckBlankDivCss, setPwCheckBlankDivCss] = useState({height:"1.75rem"});



    useEffect(()=>{
        if(pwValue !== ""){
            if (exp.test(pwValue)) {
                setCssPwIsValid("is-valid");
                props.isValidPwInput.current = true;
                setPwBlankDivCss({height: "0"});
            }
            else {
                setCssPwIsValid("is-invalid");
                props.isValidPwInput.current = false;
                setPwBlankDivCss({height: "0"});

            }
        }else{
            setCssPwIsValid("");
            props.isValidPwInput.current = false;
            setPwBlankDivCss({height: "1.75rem"});
        }
    },[pwValue])

    useEffect(()=>{
        if(pwCheckValue !== ""){
            if (pwValue === pwCheckValue && pwCheckValue !== "") {
                setCssPwCheckIsValid("is-valid");
                setPwCheckBlankDivCss({height: "0"});
                props.isValidPwCheck.current = true;
            }
            else {
                setCssPwCheckIsValid("is-invalid");
                setPwCheckBlankDivCss({height: "0"});

                props.isValidPwCheck.current = false;
            }
        }else {
            setCssPwCheckIsValid("");
            setPwCheckBlankDivCss({height: "1.75rem"});
            props.isValidPwCheck.current = false;
        }
    },[pwValue,pwCheckValue])

    return(
        <>
            <div>
                <label className="form-label mt-1 text-start" htmlFor="pwForm" style={{fontSize:"1.2rem"}}>비밀번호</label>
                <input type="password" name="password" placeholder="8~32자의 영문,숫자,특문" className={"form-control "+cssPwIsValid} id="pwForm"
                       value={pwValue} onChange={(event)=>{setPwValue(event.target.value)}} />
                <div className="invalid-feedback" style={{fontSize:"1rem"}}>사용할 수 없는 비밀번호 입니다.</div>
                <div className="valid-feedback"  style={{fontSize:"1rem"}}>사용가능한 비밀번호 입니다.</div>
                <div style={pwBlankDivCss}/>
            </div>

            <div>
                <label className="form-label mt-1 text-start" htmlFor="pwCheckForm" style={{fontSize:"1.2rem"}}>비밀번호 확인</label>
                <input type="password" name="pwCheck" placeholder="비밀번호를 다시 입력해주세요." className={"form-control "+cssPwCheckIsValid} id="pwCheckForm"
                       value={pwCheckValue} onChange={(event)=>{setPwCheckValue(event.target.value)}}/>
                <div className="invalid-feedback" style={{fontSize:"1rem"}}>비밀번호가 일치하지 않습니다.</div>
                <div className="valid-feedback"  style={{fontSize:"1rem"}}>비밀번호가 일치합니다.</div>
                <div style={pwCheckBlankDivCss}/>
            </div>
        </>
    )
}

export default PwInput