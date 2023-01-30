package kr.tareun.ranchat.model.vo;

import lombok.Getter;

import java.util.*;

@Getter
public class ChatRoomVO {
    final private String roomId;
    private Map<String, String> members = new HashMap<>();


    public ChatRoomVO() {
        roomId = UUID.randomUUID().toString();
    }
    public ChatRoomVO(String roomId){
        this.roomId = roomId;
    }

    public void joinMember(String memberId, String nickname){
        members.put(memberId, nickname);
    }

    public int outMember(String memberId){
        members.remove(memberId);
        return members.size();
    }
}
