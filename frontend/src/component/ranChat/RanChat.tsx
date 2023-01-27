import React, {FC, useEffect, useRef, useState} from "react";
import Sock from 'sockjs-client';
import {Client, IStompSocket} from "@stomp/stompjs";
import useDidMountEffect from '../util/useDidMountEffect';
import MessageContainer from "./MessageContainer";
import GetUserId from "../util/GetUserId";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import ChatBoxHead from "./ChatBoxHead";
import ScrollToBottom from "react-scroll-to-bottom";

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
    const [messageLog, setMessageLog] = useState<MessageVO[]>();
    const [received, setReceived] = useState<MessageVO>();
    const messageInput = useRef<HTMLInputElement>(null);


    // 페이지 변경시 실행할 함수.(연결종료, 퇴장 메시지 송출)
    const onBeforeUnload = ()=>{
        client.current.publish({
            destination:'/publish/chat/out',
            body:JSON.stringify({roomId: roomInfo?.roomId, message:"님이 퇴장하였습니다." , writer:userId, type:"memberOut"})
        });
        client.current.deactivate().then(); // 통신 종료
        window.removeEventListener("beforeunload", onBeforeUnload); // 이벤트 리스너 제거.(메모리 누수 방지)
        window.removeEventListener("popstate",onBeforeUnload);
    }
    // 메세지 보내기 함수
    const sendOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>)=>{
        if (event.shiftKey) return;
        if(event.key==="Enter"){
            if (!event.nativeEvent.isComposing){
                send();
            }
        }
        return;
    }
    const send = ()=>{
        if(messageInput.current !== null){
            client.current.publish({
                destination:'/publish/chat/message',
                body:JSON.stringify({roomId: roomInfo?.roomId, message:messageInput.current.value , writer:userId, type:"message"})
            });
            messageInput.current.value="";
        }
    };

    // Stomp 클라이언트 생성
    const client = useRef(new Client({
        webSocketFactory: ()=>{
            return new Sock('http://localhost:8080/ranChatWs') as IStompSocket;
        },
        // debug: function (str) {
        //     console.log(str);
        // },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000
    }))
    // 통신 연결시(activate()) 실행됨 roomID를 기준으로 구독.
    client.current.onConnect= ()=>{
        client.current.subscribe('/subscript/chat/room/'+roomInfo?.roomId, (chat)=>{ // 구독후 해당 경로로 메세지 수신시 실행함수
            const content = JSON.parse(chat.body);
            setReceived(content);
        });
        client.current.publish({
            destination:'/publish/chat/join',
            body:JSON.stringify({roomId: roomInfo?.roomId, message:"님이 입장하였습니다." , writer:userId, type:"memberIn"})
        });
    };


    // mount 했을때 한번 실행. WebSocket 통신에 사용할 채팅방 매칭
    useEffect(()=>{
        fetch("ranChat")
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
    },[roomInfo?.roomId]);
    // 메세지 수신시 log 추가
    useEffect(()=> {
        if (received !== undefined) {
            if(received.type === "memberIn" || received.type === "memberOut"){
                fetch("getRoomInfo?roomId="+roomInfo?.roomId)// 현재 채팅방의 정보 가져오기(입장한 유저 목록)
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

    return (
        <div className="chat-box">
            <ChatBoxHead memberMap={roomInfo?.memberMap} userId={userId}/>
                <MessageContainer messages={messageLog} userId={userId} memberMap={roomInfo?.memberMap}/>
            <div className="message-form">
                <input className="message-input"
                       onKeyDown={(event)=>{sendOnKeyDown(event);}}
                       ref={messageInput}
                />
                <button type="button" className="send-button" onClick={send}>보내기</button>
            </div>
        </div>
    );
};

export default RanChat;