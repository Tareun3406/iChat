import React, {FC, useEffect, useRef, useState} from "react";
import Sock from 'sockjs-client';
import {Client, IStompSocket} from "@stomp/stompjs";
import useDidMountEffect from '../util/useDidMountEffect';
import MessageContainer from "./MessageContainer";

class MessageVO{
    roomId;
    message;
    writer;
    constructor(roomId: String, message: String, writer: String) {
        this.roomId = roomId;
        this.message = message;
        this.writer = writer;
    }
}


const RanChat: FC = () => {
    const[room, setRoom] = useState({roomId: "", member: []})
    const[messageInput, setMessageInput] = useState("");
    const[messageLog, setMessageLog] = useState<MessageVO[]>();
    const[received, setReceived] = useState<MessageVO>();

    // Stomp 클라이언트 생성
    const client = useRef(new Client({
        webSocketFactory: ()=>{
            return new Sock('http://localhost:8080/ranChatWs') as IStompSocket;
        },
        debug: function (str) {
            console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000
    }))
    // 통신 연결시(activate()) 실행됨 방ID를 기준으로 구독.
    client.current.onConnect= ()=>{
        client.current.subscribe('/subscript/chat/room/'+room.roomId, (chat)=>{ // 구독후 해당 경로로 메세지 수신시 실행함수
            const content = JSON.parse(chat.body);
            setReceived(content);
        })
        client.current.publish({
            destination:'/publish/chat/message',
            body:JSON.stringify({roomId: room.roomId, message:"입장테스트" , writer:"system"})
        });
    }

    // mount 했을때 한번 실행. WebSocket 통신에 사용할 방 정보 가져오기.
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
    // 방 정보 가져온 뒤 실행. WebSocket 통신 시작
    useDidMountEffect(()=>{ client.current.activate() },[room.roomId]);
    // 메세지 수신시 log 추가
    useEffect(()=> {
        if (received !== undefined) {
            if(messageLog === undefined) setMessageLog([received]);
            else setMessageLog([...messageLog, received]);
        }
    },[received])

    const send = ()=>{
            client.current.publish({
                destination:'/publish/chat/message',
                body:JSON.stringify({roomId: room.roomId, message:messageInput , writer:"userId"})
            });
    }

    return (
        <div className="chat-box">
            <MessageContainer messages={messageLog}/>
            <div className="message-form">
                <input className="message-input" onChange={(event)=>setMessageInput(event.target.value)}/>
                <button type="button" className="send-button" onClick={send}>보내기</button>
            </div>
        </div>
    );
};

export default RanChat;