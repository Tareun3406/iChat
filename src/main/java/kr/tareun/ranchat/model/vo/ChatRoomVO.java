package kr.tareun.ranchat.model.vo;

import lombok.Getter;

import java.util.*;

@Getter
public class ChatRoomVO {
    final private String roomId;
    private final Map<String, String> membersName = new HashMap<>();
    private final Map<String, Boolean> membersIsOnLine = new HashMap<>();


    public ChatRoomVO() {
        roomId = UUID.randomUUID().toString();
    }
    public ChatRoomVO(String roomId){
        this.roomId = roomId;
    }

    public void joinMember(String memberId, String nickname){
        membersName.put(memberId, nickname);
        membersIsOnLine.put(memberId, true);
    }

    public int outMember(String memberId){
        membersIsOnLine.put(memberId, false);
        return membersName.size();
    }
}
