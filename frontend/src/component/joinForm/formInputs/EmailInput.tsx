import React, {MutableRefObject, useEffect, useState} from "react";

interface props{
    isValidEmail: MutableRefObject<boolean>;
}
const EmailValidMessage = (props: props)=>{

    const expEmail = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+$/;
    const [emailValue, setEmailValue] = useState("");
    const [emailValidMsg,setEmailValidMsg] = useState(<span style={{color:"red"}}></span>);

    const emailDoubleCheck = ()=>{
        fetch("/getIsValidEmail?username="+emailValue).then((response)=>{
            return response.text()
        }).then((text)=>{
            if(text === "true"){
                setEmailValidMsg(<span style={{color:"red"}}>중복 이메일입니다. 다른 이메일을 사용해주세요.</span>)
                props.isValidEmail.current = false;
            }else{
                setEmailValidMsg(<span style={{color:"blue"}}>사용 가능한 이메일입니다.</span>)
                props.isValidEmail.current = true;
            }
        })
    }
    useEffect(()=>{
        if (emailValue !== ""){
            if(expEmail.test(emailValue)){
                setEmailValidMsg(<span style={{color:"blue"}}>사용 가능합니다. 중복확인 버튼을 눌러주세요.</span>)
                props.isValidEmail.current = false;
            }else {
                setEmailValidMsg(<span style={{color: "red"}}>올바른 이메일 주소를 입력해주세요.</span>)
                props.isValidEmail.current = false;
            }
        }
    },[emailValue])

    return(
        <div>
            <div className="form-tag">
                <p className="tag-name">이메일</p>
                <div className="form-input-back">
                    <input type="text" name="username" className="form-input" placeholder="ex) anno123@google.com"
                           value={emailValue} onChange={(event)=>{setEmailValue(event.target.value)}}/>
                </div>
                <button type="button" className="email-check-btn" onClick={emailDoubleCheck}>중복확인</button>
            </div>
            <div className="validation-message">
                {emailValidMsg}
            </div>
        </div>
    );
}

export default EmailValidMessage;