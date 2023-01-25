package kr.tareun.ranchat.repository;

import kr.tareun.ranchat.model.vo.ChatMessageVO;
import kr.tareun.ranchat.model.vo.ChatRoomVO;

import java.util.Map;

public interface ChatRoomRepository {

    public ChatRoomVO createRoom();
    public void addRoom(ChatRoomVO room);
    public void deleteRoom(String roomId);
    public void joinRoom(ChatMessageVO message, String nickname);
    public void outRoom(ChatMessageVO message);
    public Map<String,ChatRoomVO> getRoomList();
    public ChatRoomVO getRoomInfo(String roomId);
}
