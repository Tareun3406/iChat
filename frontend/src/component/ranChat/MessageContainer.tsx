import React, {FC} from "react";

interface Message {
    roomId: String;
    message: String;
    writer: String;
}

interface Messages {
    messages: Message[] | undefined;
}

const MessageContainer: FC<Messages> = (messages) => {
    const test = messages.messages?.map((message, index) => {
        let className: string;  // li 태그에 들어갈 클래스명
        if (message.writer === "system") {  // system 메시지 일경우
            className = "message-system";
            return (
                <li key={index} className={className}>{message.message}</li>
            )
        } else if (message.writer === "test") className = "chat-message-send"; // 본인이 보낸 내용일 경우
        else className = "chat-message-receive";// 받은 메세지
        return (
            <li key={index} className={className}>{message.writer}:{message.message}</li>
        )
    })

    return (
        <ul className="chat-message-container">
            {test}
        </ul>
    );
}

export default MessageContainer;