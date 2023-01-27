import {useEffect, useState} from "react";

const GetUserId: any = ()=>{
    const [userId,setUserId] = useState<string>();
    useEffect(()=>{
        console.log("로그인 정보 가져오기");
        fetch("/getLoginMember")
            .then((response)=>{
                return response.text();
            })
            .then((text)=>{
                    setUserId(text);
            })
    },[]);
    return [userId,setUserId];
};

export default GetUserId;