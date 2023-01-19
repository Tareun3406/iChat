package kr.tareun.ranchat.model.vo;


import lombok.Getter;
import lombok.ToString;

import java.util.*;

@ToString
@Getter
public class ChatRoomVO {
    final private String roomId;
    private Map<String, String> members = new HashMap<>();


    public ChatRoomVO() {
        roomId = UUID.randomUUID().toString();
    }

    public void joinMember(String memberId, String nickname){
        members.put(memberId, nickname);
    }

    public int outMember(String memberId){
        members.remove(memberId);
        return members.size();
    }
}
