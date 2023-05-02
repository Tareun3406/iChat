import React, {useEffect} from "react";
import {Link} from "react-router-dom";

const EmailCertify = ()=>{



    let getParameter = (key: string)=>{
        return new URLSearchParams(window.location.search).get(key);
    }

    useEffect(()=>{
        fetch("/emailCertify",{
            method:"PATCH",
            headers:{
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                username: getParameter("username"),
                uid: getParameter("uid")
            })
        }).then((response)=>{});
    },[])

    return(<div>
        이메일 인증이 완료되었습니다.
        <Link to="/">홈으로 이동하기</Link>
    </div>)
}

export default EmailCertify;