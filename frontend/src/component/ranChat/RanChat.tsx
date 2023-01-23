import React, {FC, useEffect, useRef, useState} from "react";
import Sock from 'sockjs-client';
import {Client, IStompSocket} from "@stomp/stompjs";
import useDidMountEffect from '../util/useDidMountEffect';
import MessageContainer from "./MessageContainer";
import GetUserId from "../util/GetUserId";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import ChatBoxHead from "./ChatBoxHead";

class MessageVO{
    roomId;
    message;
    writer;
    type;
    constructor(roomId: string, message: string, writer: string, type: string) {
        this.roomId = roomId;
        this.message = message;
        this.writer = writer;
        this.type = type;
    }
}
class RoomInfo{
    roomId;
    memberMap;
    constructor(roomId: string, memberMap: string|undefined) {
        this.roomId = roomId;
        if(memberMap !== undefined){
            this.memberMap = new Map(Object.entries(memberMap))
        }
    }
}

const RanChat: FC = () => {
    const [roomInfo, setRoomInfo] = useState<RoomInfo>();
    const [userId,setUserId] = GetUserId();
    const [messageInput, setMessageInput] = useState("");
    const [messageLog, setMessageLog] = useState<MessageVO[]>();
    const [received, setReceived] = useState<MessageVO>();



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
        client.current.subscribe('/subscript/chat/room/'+roomInfo?.roomId, (chat)=>{ // 구독후 해당 경로로 메세지 수신시 실행함수
            const content = JSON.parse(chat.body);
            setReceived(content);
        });
        client.current.publish({
            destination:'/publish/chat/join',
            body:JSON.stringify({roomId: roomInfo?.roomId, message:"'"+userId+"'"+" 님이 입장하였습니다." , writer:userId, type:"memberIn"})
        });
    };

    const onBeforeUnload = ()=>{
        client.current.publish({
            destination:'/publish/chat/out',
            body:JSON.stringify({roomId: roomInfo?.roomId, message:"'"+userId+"'"+" 님이 퇴장하였습니다." , writer:userId, type:"memberOut"})
        });
        // client.current.deactivate().then(()=>console.log("disconnected"));
    }


    // mount 했을때 한번 실행. WebSocket 통신에 사용할 방 정보 가져오기.
    useEffect(()=>{
        fetch("ranChatTest")
            .then((response) => {
                return response.json();
            })
            .then((json) =>{
                setRoomInfo(new RoomInfo(json.roomId, undefined));
            })
            .catch((error) => console.log("error: ", error));
    },[]);
    // 방 정보 가져온 뒤 실행. WebSocket 통신 시작
    useDidMountEffect(()=>{
        client.current.activate()
        window.addEventListener("beforeunload", onBeforeUnload);
        window.addEventListener("popstate",onBeforeUnload);
        return ()=>{
            window.removeEventListener("beforeunload", onBeforeUnload);
            window.removeEventListener("popstate",onBeforeUnload);
        }
    },[roomInfo?.roomId]);
    // 메세지 수신시 log 추가
    useEffect(()=> {
        if (received !== undefined) {
            if(received.type === "memberIn" || received.type === "memberOut"){
                fetch("getRoomInfo?roomId="+roomInfo?.roomId)
                    .then((response) => {
                        return response.json();
                    })
                    .then((json) =>{
                        setRoomInfo(new RoomInfo(json.roomId,json.members));
                    })
                    .catch((error) => console.log("error: ", error));
            }
            if(messageLog === undefined) setMessageLog([received]);
            else setMessageLog([...messageLog, received]);
        }
    },[received]);

    const send = ()=>{
        if(messageInput !== ""){
            client.current.publish({
                destination:'/publish/chat/message',
                body:JSON.stringify({roomId: roomInfo?.roomId, message:messageInput , writer:userId, type:"message"})
            });
            setMessageInput("");
        }
    };
    const messageOnChange= (target: any)=>{
        setMessageInput(target.value);
    };

    return (
        <div className="chat-box">
            <ChatBoxHead memberMap={roomInfo?.memberMap} userId={userId}/>
            <MessageContainer messages={messageLog} userId={userId} members={roomInfo?.memberMap}/>
            <div className="message-form">
                <input className="message-input"
                       onChange={(event)=>messageOnChange(event.target)}
                       value={messageInput}
                       onKeyDown={(event)=>{if(event.key === 'Enter') send();}}
                />
                <button type="button" className="send-button" onClick={send}>보내기</button>
            </div>
        </div>
    );
};

export default RanChat;