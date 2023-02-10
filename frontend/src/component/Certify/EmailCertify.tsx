import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import CsrfToken from "../util/CsrfToken";

const EmailCertify = ()=>{

    const [csrf, setCsrf] = useState<string>("");


    let getParameter = (key: string)=>{
        return new URLSearchParams(window.location.search).get(key);
    }

    useEffect(()=>{

        fetch("/emailCertify",{
            method:"PATCH",
            headers:{
                'Content-type': 'application/json',
                'X-CSRF-Token': csrf
            },
            body: JSON.stringify({
                username: getParameter("username"),
                uid: getParameter("uid")
            })
        }).then((response)=>{});
    },[csrf])

    return(<div>
        이메일 인증이 완료되었습니다.
        <Link to="/">홈으로 이동하기</Link>
    </div>)
}

export default EmailCertify;