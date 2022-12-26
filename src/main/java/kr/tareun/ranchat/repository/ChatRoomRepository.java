package kr.tareun.ranchat.repository;

import kr.tareun.ranchat.model.vo.ChatMessageVO;
import kr.tareun.ranchat.model.vo.ChatRoomVO;

public interface ChatRoomRepository {
    public ChatRoomVO matchRoom();
    public void joinRoom(ChatMessageVO message);
    public void outRoom(ChatMessageVO message);
}
