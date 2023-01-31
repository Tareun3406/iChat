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

    const bottom = useRef<HTMLLIElement>(null);
    const messageContainer = useRef<HTMLUListElement>(null);
    const isBottomMessage = useRef(true);
    const innerHeight = messageContainer.current?.offsetHeight;

    const onScrollEvent = ()=>{
        const scrollTop = messageContainer.current?.scrollTop;
        if (scrollTop !== undefined && innerHeight !== undefined){
            isBottomMessage.current = scrollTop + innerHeight === messageContainer.current?.scrollHeight;
        }
    };
    useEffect(()=>{
        if(isBottomMessage)
            bottom.current?.scrollIntoView();
    })

    const messageLog = props.messages?.map((message, index) => {
        let className: string;  // li 태그에 들어갈 클래스명
        switch (message.type){
            case "memberIn":
                // if (joinerMap.current.get(message.writer) === undefined)
                //     joinerMap.current.set(message.writer, container.memberMap?.get(message.writer) as string)
                // className = "message-system";
                // return (
                //     <li key={index} className={className}>{joinerMap.current.get(message.writer)}{message.message}</li>
                // )
            case "memberOut":
                className = "message-system";
                return (
                    <li key={index} className={className}>{props.memberNameMap?.get(message.writer)}{message.message}</li>
                )
            case "system" :
                className = "message-system";
                return (
                    <li key={index} className={className}>{message.message}</li>
                )
            case "message" :
                if(message.writer === props.userId) className = "chat-message-send"; // 보낸 메세지
                else className = "chat-message-receive";// 받은 메세지
                return (
                    <li key={index} className={className}>{message.message}</li>
                )
        }
    })

    return (
        <ul className="chat-message-container" ref={messageContainer} onScroll={onScrollEvent}>
            {messageLog}
            <li style={{clear:"both"}} ref={bottom}></li>
        </ul>
    );
}

export default MessageContainer;