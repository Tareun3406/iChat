import React, {MutableRefObject, useEffect, useState} from "react";

interface props{
    isValidNickname: MutableRefObject<boolean>;
}
const NicknameInput= (props:props)=>{
    const invalidValues = ["관리", "GM", "gm", "Gm", "운영", "admin", "Admin", "ADMIN"]; // 사칭 방지
    const exp = /^[가-힣A-Za-z0-9]{3,10}$/;
    const [nickNameValue, setNickNameValue] = useState("");
    const [nickNameValidMsg,setNickNameValidMsg] = useState(<span style={{color:"red"}}></span>);

    useEffect(()=>{
        if(nickNameValue !== ""){
            let isInvalid = false;
            if(exp.test(nickNameValue)){
                invalidValues.forEach((invalidName)=>{
                    if (nickNameValue.includes(invalidName)){
                        isInvalid = true;
                        return;
                    }
                });
            }else isInvalid = true;
            if (isInvalid){
                setNickNameValidMsg(<span style={{color:"red"}}>사용할 수 없습니다. 다른 닉네임을 사용해 주세요.</span> )
                props.isValidNickname.current = false;
            }

            else {
                setNickNameValidMsg(<span style={{color: "blue"}}>사용 가능한 닉네임입니다.</span>)
                props.isValidNickname.current = true;
            }
        }
    },[nickNameValue]);

    return(
        <div>
            <div className="form-tag">
                <p className="tag-name">닉네임</p>
                <div className="form-input-back">
                    <input type="text" name="nickname" className="form-input" placeholder="한/영,숫자만 사용가능(3자이상)"
                    value={nickNameValue} onChange={(event)=>{setNickNameValue(event.target.value)}}/>
                </div>
            </div>
            <div className="validation-message">
                {nickNameValidMsg}
            </div>
        </div>
    )
}

export default NicknameInput;