package kr.tareun.ranchat.repository;

import kr.tareun.ranchat.domain.vo.ChatRoomVO;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class ChatRoomRepository {
    private Map<String, ChatRoomVO> chatRoomMap = new HashMap<>();

    public ChatRoomRepository() {
        chatRoomMap.put("test",new ChatRoomVO());
    }

    public void putChatRoom(String id,ChatRoomVO room){
        chatRoomMap.put(id,room);
    }
}
