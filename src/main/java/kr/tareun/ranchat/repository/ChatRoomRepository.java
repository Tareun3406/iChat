package kr.tareun.ranchat.repository;

import kr.tareun.ranchat.model.vo.ChatMessageVO;
import kr.tareun.ranchat.model.vo.ChatRoomVO;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;

@Repository
public class ChatRoomRepository {
    Queue<ChatRoomVO> roomQueue = new LinkedList<>();  // 대기열에 등록된 방
    Map<String,ChatRoomVO> rooms= new HashMap<>(); // 생성된 방


    // 랜덤매칭 시작
    public ChatRoomVO matchRoom(){
        ChatRoomVO room;
        if (roomQueue.isEmpty()){               // 대기중인 방이 없을 경우
            room = createRoom();                // 새로운 방 생성
            roomQueue.add(room);   // 생성된 방 대기열에 등록
        }else {
            room = roomQueue.remove(); // 대기열에 등록된 방 가져오기
        }
        return room;
    }

    // 채팅방 입장
    public void joinRoom(ChatMessageVO message){
        String joiner = message.getWriter();
        rooms.get(message.getRoomId()).joinMember(joiner);
    }

    // 채팅방 퇴장
    public void outRoom(ChatMessageVO message){
        String outer = message.getWriter();
        String roomId = message.getRoomId();
        int remaining = rooms.get(roomId).outMember(outer);
        if(remaining == 0){
            rooms.remove(roomId);   // 남은 인원이 없을경우 채팅방 삭제
        }
    }

    // 채팅방 생성
    private ChatRoomVO createRoom(){
        ChatRoomVO room = new ChatRoomVO();
        rooms.put(room.getRoomId(), room);
        return room;
    }


}
