import React, {FC, useEffect, useRef, useState} from "react";
import Sock from 'sockjs-client';
import {Client, IStompSocket} from "@stomp/stompjs";
import {createRoot} from "react-dom/client";

const RanChat: FC = () => {
    const[room, setRoom] = useState({roomId: "", member: []})

    const client = new Client({
        debug: function (str) {
            console.log(str);
            },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    });
    client.webSocketFactory = function () {
        return new Sock('http://localhost:8080/ranChatws') as IStompSocket;
    };
    client.onConnect= ()=>{
        client.subscribe('/subscript/chat/room/'+room.roomId, (chat)=>{ // 구독후 해당 경로로 메세지 수신시 실행함수
            const content = JSON.parse(chat.body);
            const element = React.createElement("p",{className: "chat-message-receive"},content.message);
            const root = createRoot(document.getElementsByClassName("chat-box")[0]);
            root.render(element);
        })
    }

    useEffect(()=>{
        fetch("ranChatTest")
            .then((response) => {
                return response.json();
            })
            .then((json) =>{
                setRoom(json);
            })
            .catch((error) => console.log("error: ", error));
    },[])

    const didMount = useRef(false);
    useEffect(()=>{
        if (didMount.current){
            client.activate();
        }
        else didMount.current = true;
    }, [room.roomId])

    const send = ()=>{
        client.publish({
            destination:'/publish/chat/message',
            body:JSON.stringify({roomId: room.roomId, message:"messageInput.value" , writer:"userId"})
        });
        console.log("test" +room);
    }

    return (
        <div className="chat-box">
            <p className="chat-message-receive">받은 대화 메세지</p>
            <p className="chat-message-send">보낸 대화 메세지</p>
            <p className="message-system">ㅁㅁㅁ님이 입장하였습니다.</p>
            <div className="message-form">
                <input className="message-input"/>
                <button type="button" className="send-button" onClick={send}>보내기</button>
            </div>
        </div>
    );
};

export default RanChat;