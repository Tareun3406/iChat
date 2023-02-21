import React, {FC, useEffect, useRef} from "react";

interface Message {
    roomId: string;
    message: string;
    writer: string;
    type: string;
}

interface Props {
    messages: Message[] | undefined;
    userId:   string | React.Dispatch<React.SetStateAction<string | undefined>> | undefined;
    memberNameMap : Map<string, string> | undefined;
    memberStatusMap : Map<string, boolean> | undefined;
}

const MessageContainer: FC<Props> = (props) => {

    const messageLog = props.messages?.map((message, index) => {
        switch (message.type){
            case "memberIn":
            case "memberOut":
                return (
                    <h5 style={{clear:"both"}} key={index}>{props.memberNameMap?.get(message.writer)}{message.message}</h5>
                )
            case "system" :
                return (
                    <h5 style={{clear:"both"}} key={index}>{message.message}</h5>
                )
            case "message" :
                if(message.writer !== props.userId) { // 받은 메세지
                    return (
                        <div className="card bg-light mb-1" style={{maxWidth: "20rem", clear:"both"}} key={index}>
                            <div className="card-header" style={{padding:"0 1rem", textAlign:"left"}}>{props.memberNameMap?.get(message.writer)}</div>
                            <div className="card-body" style={{padding:"0 1rem", textAlign:"left"}}>
                                <p className="card-text">{message.message}</p>
                            </div>
                        </div>
                    )
                }
                else { // 보낸 메세지
                    return (
                        <div className="card bg-secondary mb-1" style={{maxWidth: "20rem", clear:"both", float:"right", whiteSpace:"pre-wrap"}} key={index}>
                            <div className="card-body" style={{padding:"0 1rem", textAlign:"left"}}>
                                <p className="card-text">{message.message}</p>
                            </div>
                        </div>
                    )
                }
        }
    })

    return (
        <>
            {messageLog}
        </>
    );
}

export default MessageContainer;