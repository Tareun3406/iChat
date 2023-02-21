import React, {ChangeEvent, FC, useEffect, useRef, useState} from "react";
import Sock from 'sockjs-client';
import {Client, IStompSocket} from "@stomp/stompjs";
import useDidMountEffect from '../util/useDidMountEffect';
import MessageContainer from "./MessageContainer";
import GetUserId from "../util/GetUserId";
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
    memberNameMap;
    memberStatus: Map<string, boolean> | undefined;
    constructor(roomId: string, memberNameMap: string|undefined, memberStatus: string|undefined) {
        this.roomId = roomId;
        if(memberNameMap !== undefined && memberStatus !== undefined){
            this.memberNameMap = new Map(Object.entries(memberNameMap));
            // @ts-ignore
            this.memberStatus = new Map(Object.entries(memberStatus));
        }
    }
}

const RanChat: FC = () => {
    const [roomInfo, setRoomInfo] = useState<RoomInfo>();
    const [userId,setUserId] = GetUserId();
    const [messageLog, setMessageLog] = useState<MessageVO[]>();
    const [received, setReceived] = useState<MessageVO>();
    const [messageInputText, setMessageInputText] = useState("");
    const [onSend, setOnSend] = useState(true);


    const bottom = useRef<HTMLDivElement>(null);
    const isBottomMessage = useRef(true);
    const messageContainer = useRef<HTMLDivElement>(null);
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
    const sendOnKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>)=>{
        if (event.shiftKey) return;
        if(event.key==="Enter"){
            if (!event.nativeEvent.isComposing){
                send();
            }
        }
        return;
    }
    const send = ()=>{
        const sendText = messageInputText.trim();
        if(sendText !== ""){
            client.current.publish({
                destination:'/publish/chat/message',
                body:JSON.stringify({roomId: roomInfo?.roomId, message: sendText , writer:userId, type:"message"})
            });
        }
        if (onSend === true)
            setOnSend(false);
        else
            setOnSend(true);
        setMessageInputText("");
    };
    const onChangeMessage= (event: ChangeEvent<HTMLTextAreaElement>)=>{
        const trimedText = event.target.value.trim();
        if (trimedText !== "")
            setMessageInputText(event.target.value);
        else
            setMessageInputText("");
    }

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
        fetch("matchRanChat")
            .then((response) => {
                return response.json();
            })
            .then((json) =>{
                setRoomInfo(new RoomInfo(json.roomId, undefined, undefined));
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
                        setRoomInfo(new RoomInfo(json.roomId,json.membersName,json.membersIsOnLine));
                    })
                    .catch((error) => console.log("error: ", error));
            }
            if(messageLog === undefined) setMessageLog([received]);
            else setMessageLog([...messageLog, received]);
        }
    },[received]);

    return (
        <div style={{height:"-moz-max-content"}}>
            <div className="card mb-3">
                <ChatBoxHead memberNameMap={roomInfo?.memberNameMap} userId={userId} memberStatusMap={roomInfo?.memberStatus}/>

                <div className="card-body" style={{overflowY:"scroll", height:"55vh", minHeight:"20rem"}} ref={messageContainer} onScroll={(event) => onScrollEvent()}>
                    <MessageContainer messages={messageLog} userId={userId} memberNameMap={roomInfo?.memberNameMap} memberStatusMap={roomInfo?.memberStatus}/>
                    <div ref={bottom} style={{clear:"both"}}/>
                </div>


                <ul className="list-group">
                    <li className="list-group-item">
                        <label htmlFor="exampleTextarea" className="form-label mt-1">크롬에서 같은 구글 계정으로 접속할경우 동일한 사용자로 인식됩니다.</label>
                        <div className="form-group">
                            <textarea className="form-control" id="exampleTextarea" rows={3}
                                      onKeyDown={(event)=>{sendOnKeyDown(event);}}
                                      onChange={(event)=>{onChangeMessage(event);}}
                                      value={messageInputText}></textarea>
                        </div>
                    </li>
                </ul>
                <div className="card-footer pt-0">
                    <button type="button" className="btn btn-primary btn-sm" style={{float:"right", marginRight:"1rem"}} onClick={send}>보내기</button>
                </div>
            </div>
        </div>
    );
};

export default RanChat;