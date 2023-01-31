import React, {FC} from "react";

interface MemberInfo{
    memberNameMap: Map<string,string>|undefined;
    memberStatusMap: Map<string,boolean>|undefined;
    userId: any;
}
const ChatBoxHead: FC<MemberInfo> = (memberInfo)=>{

    if(memberInfo.memberNameMap !== undefined){
        for (let member of memberInfo.memberNameMap.keys()){
            if(member !== memberInfo.userId && memberInfo.memberStatusMap?.get(member) === true){
                return(
                    <div className="chat-box-head">
                        <span style={{color:'#4ab0d0'}}>{memberInfo.memberNameMap.get(member)}</span>
                        님과 대화 중
                    </div>)
            }
        }
    }

    return(<div className="chat-box-head">대화 상대를 기다리는 중</div>);
}

export default ChatBoxHead;