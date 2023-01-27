import {useEffect, useState} from "react";

const GetUserId: any = ()=>{
    const [userId,setUserId] = useState<string>();
    useEffect(()=>{
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