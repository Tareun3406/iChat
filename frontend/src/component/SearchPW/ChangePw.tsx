import React, {useEffect, useState} from "react";
import queryString from "query-string";
import {useNavigate} from "react-router-dom";

const ChangePw = ()=>{
    const navigate = useNavigate();

    const exp = /^[a-zA-Z0-9~!@#$%^&*()]{8,32}$/
    const [pwValue, setPwValue] = useState("");
    const [pwCheckValue, setPwCheckValue] = useState("");

    const [cssPwIsValid, setCssPwIsValid] = useState("");
    const [cssPwCheckIsValid, setCssPwCheckIsValid] = useState("");

    const [pwBlankDivCss, setPwBlankDivCss] = useState({height:"1.75rem"});
    const [pwCheckBlankDivCss, setPwCheckBlankDivCss] = useState({height:"1.75rem"});

    const [isValidPwInput, setIsValidPwInput] = useState<boolean>(false);
    const [isValidPwCheck, setIsValidPwCheck] = useState<boolean>(false);

    const [responseMsg, setResponseMsg] = useState<string>("");
    const query = queryString.parse(window.location.search);

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
        if (isValidPwCheck && isValidPwInput){
            setResponseMsg("서버의 응답을 기다리고 있습니다...")
            fetch("/changePw",{
                method:"PATCH",
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify({username : query.username, uid:query.uid, password:pwValue})
            }).then((response)=>{
                if(response.status === 200){
                    navigate("/login");
                }else
                    setResponseMsg("링크 정보가 만료되었습니다. 비밀번호 찾기를 처음부터 다시 시도해 주세요.");
            })
        }else
            setResponseMsg("입력 내용을 다시 확인해 주세요")
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
                <button type="button" className="btn btn-sm" onClick={onClick}>비밀변호 변경하기</button>
                <div>
                    {responseMsg}
                </div>
            </div>
        </>
    )
}

export default ChangePw;