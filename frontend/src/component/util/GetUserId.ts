import {useEffect, useState} from "react";

const GetUserId: any = ()=>{
    const [userId,setUserId] = useState<string>();
    useEffect(()=>{
        fetch("/getLoginMember")
            .then((response)=>{
                if (response.ok)
                    return response.text();
                else
                    return "Guest로 진행됩니다.(연결 실패)"
            })
            .then((text)=>{
                setUserId(text);
            });
    },[]);
    return [userId,setUserId];
};

export default GetUserId;