import React, {FC} from "react";

interface Message {
    roomId: String;
    message: String;
    writer: string;
    type: String;
}

interface MessageContainer {
    messages: Message[] | undefined;
    userId:   String | React.Dispatch<React.SetStateAction<String | undefined>> | undefined;
    members : any | undefined;
}

const MessageContainer: FC<MessageContainer> = (container) => {
    console.log(container.members)
    const test = container.messages?.map((message, index) => {
        let className: string;  // li 태그에 들어갈 클래스명
        let memberName = container.members.get(message.writer);
        switch (message.type){
            case "memberIn":
            case "memberOut":
            case "system" :
                className = "message-system";
                return (
                    <li key={index} className={className}>{message.message}</li>
                )
            case "message" :
                if(message.writer === container.userId) className = "chat-message-send"; // 보낸 메세지
                else className = "chat-message-receive";// 받은 메세지
                return (
                    <li key={index} className={className}>{memberName}:{message.message}</li>
                )
        }
    })

    return (
        <ul className="chat-message-container">
            {test}
        </ul>
    );
}

export default MessageContainer;