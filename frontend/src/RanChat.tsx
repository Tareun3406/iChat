import React, { FC } from "react";

const RanChat: FC = () => {
    return (
        <div className="chat-box">
            <p className="chat-message-receive">받은 대화 메세지</p>
            <p className="chat-message-send">보낸 대화 메세지</p>
            <p className="message-system">ㅁㅁㅁ님이 입장하였습니다.</p>
            <div className="message-form">
                <input className="message-input"/>
                <button type="button" className="send-button">보내기</button>
            </div>
        </div>
    );
};

export default RanChat;