import React, {FC, useRef} from "react";

interface MemberInfo{
    memberMap: Map<string,string>|undefined;
    userId: any;
}
const ChatBoxHead: FC<MemberInfo> = (memberInfo)=>{

    if(memberInfo.memberMap !== undefined){
        for (let member of memberInfo.memberMap.keys()){
            if(member !== memberInfo.userId){
                return(
                    <div className="chat-box-head">
                        <span style={{color:'#4ab0d0'}}>{memberInfo.memberMap.get(member)}</span>
                        님과 대화 중
                    </div>)
            }
        }
    }

    return(<div className="chat-box-head">대화 상대를 기다리는 중</div>);
}

export default ChatBoxHead;