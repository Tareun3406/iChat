import React, {MutableRefObject, useEffect, useState} from "react";

interface props{
    isValidEmail: MutableRefObject<boolean>;
}
const EmailValidMessage = (props: props)=>{

    const expEmail = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+$/;
    const [emailValue, setEmailValue] = useState("");
    const [cssIsValid, setCssIsValid] = useState("");
    const [validMsg,setValidMsg] = useState("");
    const [inValidMsg,setInValidMsg] = useState("");
    const [needCheckMsg,setNeedCheckMsg] = useState("");

    const [blankDivCss, setBlankDivCss] = useState({height:"1.75rem"});

    const emailDoubleCheck = ()=>{
        if(expEmail.test(emailValue)){
            fetch("/getIsValidEmail?username="+emailValue).then((response)=>{
                return response.text()
            }).then((text)=>{
                if(text === "true"){
                    setCssIsValid("is-invalid");
                    setInValidMsg("중복 이메일입니다. 다른 이메일을 사용해주세요.");
                    props.isValidEmail.current = false;
                }else{
                    setCssIsValid("is-valid");
                    setValidMsg("사용 가능한 이메일입니다.");
                    setNeedCheckMsg("");
                    props.isValidEmail.current = true;
                }
            });
        }
    }
    useEffect(()=>{
        if (emailValue === ""){
            setCssIsValid("");
            setBlankDivCss({height: "1.75rem"});
            props.isValidEmail.current = false;
        }else if(expEmail.test(emailValue)){
            setCssIsValid("is-valid");
            setValidMsg("사용 가능한 이메일입니다.");
            setNeedCheckMsg("중복확인 버튼을 눌러주세요.")
            setBlankDivCss({height: "0"});
            props.isValidEmail.current = false;
        }else {
            setCssIsValid("is-invalid");
            setInValidMsg("올바른 이메일 주소를 입력해주세요.");
            setBlankDivCss({height: "0"});
            props.isValidEmail.current = false;
        }
    },[emailValue])

    return(
        <div>
            <label className="form-label mt-4 text-start" htmlFor="EmailForm" style={{fontSize:"1.2rem"}}>Email</label>
            <div style={{width:"max-content"}}>
                <input type="text" name="username" placeholder="ex) anno123@google.com" className={"form-control "+ cssIsValid} id="EmailForm"
                       value={emailValue} onChange={(event)=>{setEmailValue(event.target.value)}}
                       style={{width:"20rem", display:"inline-block", marginRight:"0.3rem"}}/>
                <button type="button" className="btn btn-primary" onClick={emailDoubleCheck}
                        style={{borderTopLeftRadius:"15rem", borderBottomLeftRadius:"15rem", width:"7rem", verticalAlign:"top"}}>중복확인</button>
                <div className="invalid-feedback" style={{fontSize:"1rem"}}>{inValidMsg}</div>
                <div className="valid-feedback"  style={{fontSize:"1rem"}}>{validMsg}
                    <span style={{fontWeight:"bold", color:"#e52527"}}>{needCheckMsg}</span>
                </div>
            </div>

            <div style={blankDivCss}/>
        </div>
    );
}

export default EmailValidMessage;