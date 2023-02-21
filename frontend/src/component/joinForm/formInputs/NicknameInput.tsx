import React, {MutableRefObject, useEffect, useState} from "react";

interface props{
    isValidNickname: MutableRefObject<boolean>;
}
const NicknameInput= (props:props)=>{
    const invalidValues = ["관리", "GM", "gm", "Gm", "운영", "admin", "Admin", "ADMIN"]; // 사칭 방지
    const exp = /^[가-힣A-Za-z0-9]{3,16}$/;
    const [nickNameValue, setNickNameValue] = useState("");
    const [cssIsValid, setCssIsValid] = useState("");

    const [blankDivCss, setBlankDivCss] = useState({height:"1.75rem"});


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
                setCssIsValid("is-invalid");
                setBlankDivCss({height: "0"});
                props.isValidNickname.current = false;
            }
            else {
                setCssIsValid("is-valid");
                setBlankDivCss({height: "0"});
                props.isValidNickname.current = true;
            }
        }else {
            setCssIsValid("");
            setBlankDivCss({height: "1.75rem"});
            props.isValidNickname.current = false;
        }
    },[nickNameValue]);

    return(
        <div>
            <label className="form-label mt-1 text-start" htmlFor="nicknameForm" style={{fontSize:"1.2rem"}}>닉네임</label>
            <input type="text" name="nickname" placeholder="한/영,숫자만 사용가능(3~16자)" className={"form-control "+cssIsValid} id="nicknameForm"
                   value={nickNameValue} onChange={(event)=>{setNickNameValue(event.target.value)}}/>
            <div className="invalid-feedback" style={{fontSize:"1rem"}}>사용할 수 없습니다. 다른 닉네임을 사용해 주세요.</div>
            <div className="valid-feedback"  style={{fontSize:"1rem"}}>사용 가능한 닉네임입니다.</div>
            <div style={blankDivCss}/>
        </div>
    )
}

export default NicknameInput;