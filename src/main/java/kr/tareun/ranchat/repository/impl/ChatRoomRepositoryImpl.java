package kr.tareun.ranchat.repository.impl;

import kr.tareun.ranchat.model.vo.ChatMessageVO;
import kr.tareun.ranchat.model.vo.ChatRoomVO;
import kr.tareun.ranchat.repository.ChatRoomRepository;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class ChatRoomRepositoryImpl implements ChatRoomRepository {

    private final Map<String,ChatRoomVO> rooms= new HashMap<>(); // 생성된 방목록

    // 새로운 방 생성
    @Override
    public ChatRoomVO createRoom() {
        ChatRoomVO room = new ChatRoomVO();
        rooms.put(room.getRoomId(), room);
        return room;
    }

    // 방정보를 가지고 기존 방 목록에 추가
    @Override
    public void addRoom(ChatRoomVO room) {
        rooms.put(room.getRoomId(), room);
    }

    @Override
    public void deleteRoom(String roomId) {
        rooms.remove(roomId);
    }

    // 채팅방 입장
    public void joinRoom(ChatMessageVO message, String nickname){
        String joinerId = message.getWriter();
        rooms.get(message.getRoomId()).joinMember(joinerId, nickname);
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

    @Override
    public Map<String, ChatRoomVO> getRoomList() {
        return rooms;
    }

    @Override
    public ChatRoomVO getRoomInfo(String roomId) {
        return rooms.get(roomId);
    }
}
