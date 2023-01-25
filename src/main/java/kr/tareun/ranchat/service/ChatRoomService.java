package kr.tareun.ranchat.service;

import kr.tareun.ranchat.model.vo.ChatMessageVO;
import kr.tareun.ranchat.model.vo.ChatRoomVO;

public interface ChatRoomService {
    public ChatRoomVO matchRoom();
    public void joinRoom(ChatMessageVO message);
    public void outRoom(ChatMessageVO message);
    public ChatRoomVO getRoomInfo(String roomId);
}
