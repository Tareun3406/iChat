import React, {MutableRefObject, useEffect, useState} from "react";

interface props{
    isValidPwInput: MutableRefObject<boolean>;
    isValidPwCheck: MutableRefObject<boolean>;
}
const PwInput = (props: props)=>{

    const exp = /^[a-zA-Z0-9~!@#$%^&*()]{8,24}$/
    const [pwValue, setPwValue] = useState("");
    const [pwValidMsg,setPwValidMsg] = useState(<span style={{color:"red"}}></span>);

    const [pwCheckValue, setPwCheckValue] = useState("");
    const [pwCheckValidMsg,setPwCheckValidMsg] = useState(<span style={{color:"red"}}></span>);


    useEffect(()=>{
        if(pwValue !== ""){
            if (exp.test(pwValue)) {
                setPwValidMsg(<span style={{color: "blue"}}>사용가능한 비밀번호 입니다.</span>)
                props.isValidPwInput.current = true;
            }
            else {
                setPwValidMsg(<span style={{color: "red"}}>사용할 수 없는 비밀번호 입니다.</span>)
                props.isValidPwInput.current = false;
            }
        }
    },[pwValue])

    useEffect(()=>{
        if(pwCheckValue !== ""){
            if (pwValue === pwCheckValue && pwCheckValue !== "") {
                setPwCheckValidMsg(<span style={{color: "blue"}}>비밀번호가 일치합니다.</span>)
                props.isValidPwCheck.current = true;
            }
            else {
                setPwCheckValidMsg(<span style={{color: "red"}}>비밀번호가 일치하지 않습니다.</span>)
                props.isValidPwCheck.current = false;
            }
        }
    },[pwValue,pwCheckValue])

    return(
        <div>
            <div className="form-tag">
                <p className="tag-name">비밀번호</p>
                <div className="form-input-back">
                    <input type="password" name='password' className="form-input" placeholder="8~24자의 영문,숫자,특문"
                    value={pwValue} onChange={(event)=>{setPwValue(event.target.value)}}/>
                </div>
            </div>
            <div className="validation-message">
                {pwValidMsg}
            </div>

            <div className="form-tag">
                <p className="tag-name">비밀번호 확인</p>
                <div className="form-input-back">
                    <input type="password" name='pwCheck' className="form-input"
                    value={pwCheckValue} onChange={(event)=>{setPwCheckValue(event.target.value)}}/>
                </div>
            </div>
            <div className="validation-message">
                {pwCheckValidMsg}
            </div>
        </div>
    )
}

export default PwInput